package infra

import "os"

type Config struct{
	PortBackend string
}

func LoadConfig() *Config {
	portBackend := os.Getenv("PORT_BACKEND")

    if portBackend == "" {
        portBackend = os.Getenv("PORT")
        if portBackend == "" {
            portBackend = "8080"
        }
    }

	return &Config{PortBackend: portBackend}
}
