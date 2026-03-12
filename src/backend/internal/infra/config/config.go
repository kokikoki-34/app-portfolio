package config

import (
	"fmt"
	"log/slog"
	"os"
)

type Config struct {
	Port             string
	ConnectionString string
}

func LoadConfig(logger *slog.Logger) (*Config, error) {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		logger.Info("PORT is not set. Set Default.", "port", port)
	}

	cs := os.Getenv("CONNECTION_STRING")
	if cs == "" {
		return nil, fmt.Errorf("CONNECTION_STRING is not set: application cannot start without a data source")
	}

	return &Config{Port: port, ConnectionString: cs}, nil
}
