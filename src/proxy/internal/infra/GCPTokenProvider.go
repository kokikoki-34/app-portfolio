package infra

import (
	"context"
	"log/slog"

	"golang.org/x/oauth2"
	"google.golang.org/api/idtoken"
)

type GCPTokenProvider struct{
	logger *slog.Logger
	ctx context.Context
}

func NewGCPTokenProvider(logger *slog.Logger, ctx context.Context) *GCPTokenProvider{
	return &GCPTokenProvider{ctx: ctx,logger: logger}
}

// createTarget parses the URL and initializes a Google Cloud TokenSource for IAM authentication.
func (p *GCPTokenProvider) GetTokenSource(rawURL string) oauth2.TokenSource{
	if rawURL == "" {
		return nil
	}
	ts, err := idtoken.NewTokenSource(p.ctx, rawURL)
	if err != nil {
		p.logger.Warn("Warning: Failed to create TokenSource for", "url", rawURL, "error", err)
		return nil
	}

	return ts
}
