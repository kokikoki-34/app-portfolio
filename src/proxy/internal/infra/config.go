package infra

import (
	"log/slog"
	"os"
)

type Config struct{
	PortProxy string
	URLBackend string
	PortBackend string
	URLFrontend string
	PortFrontend string
}

func LoadConfig(logger *slog.Logger) *Config {
    portProxy := os.Getenv("PORT_PROXY")
    if portProxy == "" {
        portProxy = os.Getenv("PORT")
        if portProxy == "" {
            portProxy = "8080"
        }
    }

    cfg := &Config{
        PortProxy:    portProxy,
        URLBackend:   os.Getenv("URL_BACKEND"),
        PortBackend:  os.Getenv("PORT_BACKEND"),
        URLFrontend:  os.Getenv("URL_FRONTEND"),
        PortFrontend: os.Getenv("PORT_FRONTEND"),
    }

    if cfg.URLBackend == "" {
        logger.Error("Environment variable URL_BACKEND is required")
    }
    if cfg.URLFrontend == "" {
        logger.Error("Environment variable URL_FRONTEND is required")
    }

    return cfg
}
