package infra

import (
	"fmt"
	"log/slog"
	"net"
	"net/url"
	"os"
)

type Config struct {
	HostAllowed string
	Port        string
	URLBackend  *url.URL
	URLFrontend *url.URL
}

func LoadConfig(logger *slog.Logger) (*Config, error) {
	hostAllowed := os.Getenv("HOST_ALLOWED")
	if hostAllowed == "" {
		hostAllowed = "localhost"
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	urlBackend, err := loadURL("URL_BACKEND", "PORT_BACKEND")
	if err != nil {
		return nil, fmt.Errorf("failed to load backend URL: %w", err)
	}

	urlFrontend, err := loadURL("URL_FRONTEND", "PORT_FRONTEND")
	if err != nil {
		return nil, fmt.Errorf("failed to load frontend URL: %w", err)
	}

	cfg := &Config{
		HostAllowed: hostAllowed,
		Port:        port,
		URLBackend:  urlBackend,
		URLFrontend: urlFrontend,
	}

	return cfg, err
}

func loadURL(envURL string, envPort string) (*url.URL, error) {
	rawURL := os.Getenv(envURL)
	if rawURL == "" {
		return nil, fmt.Errorf("environment variable %s is required but not set", envURL)
	}
	port := os.Getenv(envPort)

	parsedURL, err := url.Parse(rawURL)
	if err != nil {
		return nil, err
	}

	if port != "" {
		parsedURL.Host = net.JoinHostPort(parsedURL.Hostname(), port)
	}

	return parsedURL, nil
}
