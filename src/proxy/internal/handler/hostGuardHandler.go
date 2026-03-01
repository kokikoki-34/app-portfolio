package handler

import (
	"log/slog"
	"net"
	"net/http"
	"strings"
)

type HostGuardHandler struct {
	logger       *slog.Logger
	handler      http.Handler
	allowedHosts map[string]struct{}
}

func NewHostGuardHandler(logger *slog.Logger, handler http.Handler, allowedHosts []string) *HostGuardHandler {
	allowed := make(map[string]struct{}, len(allowedHosts))
	for _, host := range allowedHosts {
		allowed[strings.ToLower(host)] = struct{}{}
	}
	return &HostGuardHandler{
		logger:       logger,
		handler:      handler,
		allowedHosts: allowed,
	}
}

func (h *HostGuardHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	host, _, err := net.SplitHostPort(r.Host)
	if err != nil {
		host = r.Host
	}

	if _, ok := h.allowedHosts[strings.ToLower(host)]; !ok {
		h.logger.Warn("blocked request from untrusted host", slog.String("host", host))
		http.NotFound(w, r)
		return
	}

	h.handler.ServeHTTP(w, r)
}
