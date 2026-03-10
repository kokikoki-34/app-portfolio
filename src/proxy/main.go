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
	// -------------------------------------------------------------------------
	// Dependency
	// -------------------------------------------------------------------------
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	mux := http.NewServeMux()
	config := infra.LoadConfig(logger)

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	gcpTokenProvider := infra.NewGCPTokenProvider(logger, ctx)

	// -------------------------------------------------------------------------
	// Create Handlers
	// -------------------------------------------------------------------------
	handlerBackend := handler.NewReverseProxyHandler(logger, gcpTokenProvider, config.URLBackend)
	handlerFrontend := handler.NewReverseProxyHandler(logger, gcpTokenProvider, config.URLFrontend)

	// -------------------------------------------------------------------------
	// Routing
	// -------------------------------------------------------------------------
	mux.HandleFunc("/api/", handlerBackend.ServeHTTP)
	mux.HandleFunc("/", handlerFrontend.ServeHTTP)

	// -------------------------------------------------------------------------
	// Middleware to guard hosts
	// -------------------------------------------------------------------------
	allowedHosts := []string{"localhost", "127.0.0.1", config.HostAllowed}
	hostGuardHandler := handler.NewHostGuardHandler(logger, mux, allowedHosts)

	// -------------------------------------------------------------------------
	// Run Server
	// -------------------------------------------------------------------------
	server := &http.Server{
		Addr:    ":" + config.Port,
		Handler: hostGuardHandler,
	}

	if err := run(logger, ctx, stop, server); err != nil {
		logger.Error("server failed", "error", err)
		os.Exit(1)
	}
}

func run(logger *slog.Logger, ctx context.Context, stop context.CancelFunc, server *http.Server) error {
	go func() {
		logger.Info("server starting", "port", server.Addr)
		if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			logger.Error("server failed to start", "error", err)
			stop()
		}
	}()

	<-ctx.Done()
	logger.Info("shutting down server gracefully...")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		return err
	}

	logger.Info("server stopped completely")
	return nil
}
