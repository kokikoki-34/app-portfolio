package app

import (
	"context"
	"log/slog"
)

type repo interface {
	Pulse(ctx context.Context) (*Heartbeat, error)
}

type HeartbeatService struct {
	logger *slog.Logger
	repo   repo
}

func NewService(logger *slog.Logger, repo repo) *HeartbeatService {
	return &HeartbeatService{logger: logger, repo: repo}
}

func (s *HeartbeatService) Check(ctx context.Context) (*Heartbeat, error) {
	heartbeat, err := s.repo.Pulse(ctx)
	if err != nil {
		s.logger.Error("repository pulse failed", "error", err)
		return nil, err
	}

	return heartbeat, nil
}
