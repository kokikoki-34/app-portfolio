package infra

import "os"

type Config struct{
	HostBackend string
	PortBackend string
	HostFrontend string
	PortFrontend string
}

func LoadConfig() *Config {
	// API server info
	hostBackend := os.Getenv("HOST_BACKEND")
	if hostBackend == "" { hostBackend = "http://localhost" }

	portBackend := os.Getenv("PORT_BACKEND")
	if portBackend == "" { portBackend = "8080" }

	// Allowed origin info
	hostFrontend := os.Getenv("HOST_FRONTEND")
	if hostFrontend == "" { hostFrontend = "http://localhost" }

	portFrontend := os.Getenv("PORT_FRONTEND")
	if hostFrontend == "" { hostFrontend = "3000" }

	return &Config{HostBackend: hostBackend, PortBackend: portBackend, HostFrontend: hostFrontend, PortFrontend: portFrontend}
}
