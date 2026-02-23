package main

import (
	"net/http"
	"os"
)

// For docker health check
// When using distro-less container image, cannot use curl or wget.
// This binary enable health check.
func main() {
	resp, err := http.Get("http://localhost:8080/api/health")
	if err != nil || resp.StatusCode != http.StatusOK {
		os.Exit(1)
	}
	os.Exit(0)
}
