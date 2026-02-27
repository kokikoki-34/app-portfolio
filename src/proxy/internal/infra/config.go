package infra

import (
	"os"
)

type Config struct{
	PortProxy string
	URLBackend string
	PortBackend string
	URLFrontend string
	PortFrontend string
}

func LoadConfig() *Config {
	portProxy := os.Getenv("PORT_PROXY")
	if portProxy == "" { portProxy = "8080" }

	urlBackend := os.Getenv("URL_BACKEND")
	if urlBackend == "" { urlBackend = "http://localhost" }

	portBackend := os.Getenv("PORT_BACKEND")
	if portBackend == "" { portBackend = "8082" }

	urlFrontend := os.Getenv("URL_FRONTEND")
	if urlFrontend == "" { urlFrontend = "http://localhost" }

	portFrontend := os.Getenv("PORT_FRONTEND")
	if portFrontend == "" { portFrontend = "8083" }

	return &Config{
		PortProxy: portProxy,
		URLBackend: urlBackend,
		PortBackend: portBackend,
		URLFrontend: urlFrontend,
		PortFrontend: portFrontend,
	}
}
