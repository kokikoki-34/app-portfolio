package config

import (
	"fmt"
	"os"
)

type Config struct {
	Port             string
	ConnectionString string
}

func LoadConfig() (*Config, error) {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	cs := os.Getenv("CONNECTION_STRING")
	if cs == "" {
		return nil, fmt.Errorf("CONNECTION_STRING is not set: application cannot start without a data source")
	}

	return &Config{Port: port, ConnectionString: cs}, nil
}
