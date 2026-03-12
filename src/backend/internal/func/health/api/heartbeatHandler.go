package api

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"

	"portfolio/internal/func/health/app"
)

type service interface {
	Check(ctx context.Context) (*app.Heartbeat, error)
}

type HeartbeatHandler struct {
	logger *slog.Logger
	srv    service
}

func NewHeartbeatHandler(logger *slog.Logger, srv service) *HeartbeatHandler {
	return &HeartbeatHandler{logger: logger, srv: srv}
}

func (h *HeartbeatHandler) Check(w http.ResponseWriter, r *http.Request) {
	h.logger.Info(
		"health check request received",
		"method", r.Method,
		"path", r.URL.Path,
		"remote_addr", r.RemoteAddr,
	)

	hb, err := h.srv.Check(r.Context())
	if err != nil {
		h.logger.Error("health check failed", "error", err)

		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Internal Server Error: \n")

		return
	}

	h.logger.Info(
		"health check response sent",
		"method", r.Method,
		"path", r.URL.Path,
		"remote_addr", r.RemoteAddr,
		"heartbeat", hb.At.String(),
	)

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "OK: %v\n", hb.At.String())
}
