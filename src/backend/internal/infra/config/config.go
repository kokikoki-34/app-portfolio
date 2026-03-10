package config

import (
	"log/slog"
	"os"
)

type Config struct {
	Port             string
	ConnectionString string
}

func LoadConfig(logger *slog.Logger) *Config {
	port := os.Getenv("PORT")
	if port == "" {
		logger.Warn("PORT is not set. Defaulting to 8080")
		port = "8080"
	}

	cs := os.Getenv("CONNECTION_STRING")
	if cs == "" {
		logger.Warn("CONNECTION_STRING is not set. Could not connect Database")
	}

	return &Config{Port: port, ConnectionString: cs}
}
