# ==========================================
# Builder
# ==========================================
FROM golang:1.26 AS builder

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build -o /app/server ./cmd/main.go

RUN CGO_ENABLED=0 go build -o /app/healthcheck ./cmd/healthcheck/main.go

# ==========================================
# Runner
# ==========================================
FROM gcr.io/distroless/static-debian12

COPY --from=builder --chmod=755 /app/server /server
COPY --from=builder --chmod=755 /app/healthcheck /healthcheck

USER nonroot:nonroot
EXPOSE 8080

ENTRYPOINT ["/server"]
