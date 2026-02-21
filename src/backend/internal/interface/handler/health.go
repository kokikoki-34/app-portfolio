package handler

import (
	"fmt"
	"log/slog"
	"net/http"
)

// HealthHandler handles the health check requests.
type HealthHandler struct{
	logger *slog.Logger
}

// NewHealthHandler creates a new instance of HealthHandler.
func NewHealthHandler(logger *slog.Logger) *HealthHandler {
	return &HealthHandler{logger: logger}
}

// Check returns a simple 200 OK status.
func (h *HealthHandler) Check(w http.ResponseWriter, r *http.Request) {
	// log
	h.logger.Info(
		"health check request received",
		"method", r.Method,
		"path", r.URL.Path,
		"remote_addr", r.RemoteAddr,
	)

	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "OK")
}
