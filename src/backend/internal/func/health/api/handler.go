package api

import (
	"context"
	"log/slog"
	"net/http"

	"portfolio/internal/func/health/api/gen"
	"portfolio/internal/func/health/app"
	"portfolio/internal/web"
)

type HealthServiceInterface interface {
	Check(ctx context.Context) (*app.Health, error)
}

type HealthAPI struct {
	logger *slog.Logger
	srv    HealthServiceInterface
}

func NewHealthAPI(logger *slog.Logger, srv HealthServiceInterface) *HealthAPI {
	return &HealthAPI{logger: logger, srv: srv}
}

func (h *HealthAPI) BindServer(m *http.ServeMux) {
	gen.HandlerFromMux(h, m)
}

func (h *HealthAPI) GetHealth(w http.ResponseWriter, r *http.Request) {
	h.logger.Info(
		"request received",
		"method", r.Method,
		"path", r.URL.Path,
		"remote_addr", r.RemoteAddr,
	)

	health, err := h.srv.Check(r.Context())
	if err != nil {
		h.logger.Error("HealthAPI.GetHealth: failed to connect database", "error", err)

		web.RespondError(w, h.logger, http.StatusServiceUnavailable, "Service Unavailable")
		return
	}

	res := &gen.HealthResponse{CurrentTime: health.At}
	web.RespondJSON(w, h.logger, http.StatusOK, res)
}
