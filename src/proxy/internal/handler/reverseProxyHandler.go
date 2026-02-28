package handler

import (
	"log/slog"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"time"

	"golang.org/x/oauth2"
)

type tokenProvider interface{
	GetTokenSource(rawURL string) oauth2.TokenSource
}

type ReverseProxyHandler struct{
	proxy *httputil.ReverseProxy
}

func NewReverseProxyHandler(logger *slog.Logger, tp tokenProvider, urlTarget string) *ReverseProxyHandler {
	urlParsed, err := url.Parse(urlTarget)
	if err != nil {
		logger.Error("Failed to parse URL at initialization", "url", urlParsed, "error", err)
		panic(err)
	}

	var ts oauth2.TokenSource
	if tp != nil {
		ts = tp.GetTokenSource(urlTarget)
	}

	baseTransport, ok := http.DefaultTransport.(*http.Transport)
	if !ok {
		panic("http.DefaultTransport is not of type *http.Transport")
	}
	customTransport := baseTransport.Clone()
	customTransport.DialContext = (&net.Dialer{
		Timeout:   30 * time.Second,
		KeepAlive: 30 * time.Second,
	}).DialContext
	customTransport.TLSHandshakeTimeout = 10 * time.Second
	customTransport.ResponseHeaderTimeout = 60 * time.Second
	customTransport.IdleConnTimeout = 90 * time.Second
	customTransport.MaxIdleConnsPerHost = 100

	proxy := &httputil.ReverseProxy{
		Transport: customTransport,
		Rewrite: func(r *httputil.ProxyRequest){
		r.SetURL(urlParsed)
		r.Out.Host = urlParsed.Host

		if ts != nil {
			token, err := ts.Token()

			if err != nil {
				logger.Error("Failed to get token", "url", urlTarget, "error", err)
				return
			}

			bearerToken := "Bearer " + token.AccessToken
			r.Out.Header.Set("Authorization", bearerToken)
			r.Out.Header.Set("X-Serverless-Authorization", bearerToken)
		}
    }}

	return &ReverseProxyHandler{
		proxy: proxy,
	}
}

func (h *ReverseProxyHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.proxy.ServeHTTP(w, r)
}
