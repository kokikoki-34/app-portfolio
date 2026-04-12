package web

import (
	"encoding/json"
	"log/slog"
	"net/http"
)

func RespondJSON(w http.ResponseWriter, logger *slog.Logger, status int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	if err := json.NewEncoder(w).Encode(payload); err != nil {
		logger.Error("failed to encode response", "error", err)
	}
}

func RespondError(w http.ResponseWriter, logger *slog.Logger, status int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	payload := map[string]string{"message": message}
	if err := json.NewEncoder(w).Encode(payload); err != nil {
		logger.Error("failed to encode error response", "error", err)
	}
}
