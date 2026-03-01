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

	"portfolio/internal/api/handler"
	"portfolio/internal/infra"
)

func main() {
	// Contexts
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	config := infra.LoadConfig()
	mux := http.NewServeMux()

	// Default Settings
	slog.SetDefault(logger)

	// DI
	healthHandler := handler.NewHealthHandler(logger)

	// Routing
	mux.HandleFunc("GET /api/health", healthHandler.Check)

	// HTTP server
	server := &http.Server{
		Addr:    ":" + "8080",
		Handler: mux,
	}

	// Graceful shutdown
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	go func() {
		logger.Info("server starting", "port", config.Port)
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
