package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"proxy/internal/handler"
	"proxy/internal/infra"
)

func main() {
	// Contexts
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	config := infra.LoadConfig(logger)

	// Default Settings
	slog.SetDefault(logger)

	// GCP tokenID provider
	gcpTokenProvider := infra.GetNewGCPTokenProvider(logger, context.Background())

	// Proxy (Backend)
	urlBackend := config.URLBackend
	if config.PortBackend != "" {
		urlBackend += ":" + config.PortBackend
	}
	handlerBackend := handler.NewReverseProxyHandler(logger, gcpTokenProvider, urlBackend)
	http.HandleFunc("/api/", handlerBackend.ServeHTTP)

	// Proxy (Frontend)
	urlFrontend := config.URLFrontend
	if config.PortFrontend != "" {
		urlFrontend += ":" + config.PortFrontend
	}
	handlerFrontend := handler.NewReverseProxyHandler(logger, gcpTokenProvider, urlFrontend)
	http.HandleFunc("/", handlerFrontend.ServeHTTP)

	server := &http.Server{
		Addr:    ":" +config.PortProxy,
	}

	// Graceful shutdown
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	go func() {
		logger.Info("server starting", "port", server.Addr)
		if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			logger.Error("server failed to start", "error", err)
			os.Exit(1)
		}
	}()

	<-ctx.Done()
	logger.Info("shutting down server gracefully...")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		logger.Error("server forced to shutdown", "error", err)
		os.Exit(1)
	}

	logger.Info("server stopped completely")
}
