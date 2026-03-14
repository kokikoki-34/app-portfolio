package app

import (
	"context"
	"fmt"
)

type healthRepository interface {
	Pulse(ctx context.Context) (*Health, error)
}

type HealthService struct {
	repo healthRepository
}

func NewHealthService(repo healthRepository) *HealthService {
	return &HealthService{repo: repo}
}

func (s *HealthService) Check(ctx context.Context) (*Health, error) {
	health, err := s.repo.Pulse(ctx)
	if err != nil {
		err = fmt.Errorf("HealthService.Check: failed to get health: %w", err)
		return nil, err
	}

	return health, nil
}
