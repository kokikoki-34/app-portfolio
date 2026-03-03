package repo

import (
	"context"
	"log/slog"

	gen "portfolio/db/gen/sys"
	"portfolio/internal/func/health/app"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	logger  *slog.Logger
	pool    *pgxpool.Pool
	queries *gen.Queries
}

func NewRepository(logger *slog.Logger, pool *pgxpool.Pool) *Repository {
	return &Repository{
		logger:  logger,
		pool:    pool,
		queries: gen.New(pool),
	}
}

func (r *Repository) Pulse(ctx context.Context) (*app.Heartbeat, error) {
	at, err := r.queries.UpdateHeartbeat(ctx)
	if err != nil {
		r.logger.Error("failed to update heartbeat", "error", err)
		return nil, err
	}

	hb := &app.Heartbeat{At: at}
	return hb, nil
}
