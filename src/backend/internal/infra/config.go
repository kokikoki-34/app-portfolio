package infra

import "os"

type Config struct{
	HostBackend string
	PortBackend string
	AllowedOrigin string
}

func LoadConfig() *Config {
	// API server info
	hostBackend := os.Getenv("URL_BACKEND")
	if hostBackend == "" { hostBackend = "http://localhost" }

	portBackend := os.Getenv("PORT_BACKEND")
	if portBackend == "" { portBackend = "8080" }

	// Allowed origin info
	allowedOrigin := os.Getenv("URL_FRONTEND")
	if allowedOrigin == "" { allowedOrigin = "http://localhost" }

	portFrontend := os.Getenv("PORT_FRONTEND")
	if portFrontend != "" {
		allowedOrigin += ":" + portFrontend
	}

	return &Config{HostBackend: hostBackend, PortBackend: portBackend, AllowedOrigin: allowedOrigin}
}
