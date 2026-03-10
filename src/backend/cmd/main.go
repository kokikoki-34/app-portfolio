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

	"portfolio/internal/func/health/api"
	"portfolio/internal/func/health/app"
	"portfolio/internal/func/health/repo"
	"portfolio/internal/infra/config"
	"portfolio/internal/infra/db"
)

func main() {
	// -------------------------------------------------------------------------
	// Dependency
	// -------------------------------------------------------------------------
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	mux := http.NewServeMux()
	config, err := config.LoadConfig()
	if err != nil {
		logger.Error("failed to load config", "error", err)
		os.Exit(1)
	}

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	pool, err := db.NewPool(ctx, config.ConnectionString)
	if err != nil {
		logger.Error("failed to connect to database", "error", err)
		os.Exit(1)
	}

	// -------------------------------------------------------------------------
	// DI
	// -------------------------------------------------------------------------
	heartbeatRepo := repo.NewRepository(logger, pool)
	heartbeatService := app.NewService(logger, heartbeatRepo)
	handler := api.NewHeartbeatHandler(logger, heartbeatService)

	// Routing
	mux.HandleFunc("GET /api/health", handler.Check)

	// HTTP server
	server := &http.Server{
		Addr:    ":" + "8080",
		Handler: mux,
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
