package infra

import (
	"context"
	"fmt"

	"portfolio/internal/func/health/app"
	"portfolio/internal/func/health/infra/db/gen"

	"github.com/jackc/pgx/v5/pgxpool"
)

type HealthRepository struct {
	pool    *pgxpool.Pool
	queries *gen.Queries
}

func NewHealthRepository(pool *pgxpool.Pool) *HealthRepository {
	return &HealthRepository{
		pool:    pool,
		queries: gen.New(pool),
	}
}

func (r *HealthRepository) Pulse(ctx context.Context) (*app.Health, error) {
	at, err := r.queries.UpdateHeartbeat(ctx)
	if err != nil {
		err = fmt.Errorf("HealthRepository.Pulse: failed to update heartbeat table: %w", err)
		return nil, err
	}

	hb := &app.Health{At: at}
	return hb, nil
}
