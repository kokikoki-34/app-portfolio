backend: cd src/backend && PORT=${PORT_BACKEND} go run cmd/main.go
frontend: cd src/frontend && npm run dev
proxy: envsubst '${PORT_PROXY} ${PORT_BACKEND} ${PORT_FRONTEND}' < src/proxy/conf/nginx.conf.template > /tmp/nginx.local.conf && nginx -c /tmp/nginx.local.conf -g "daemon off;"
