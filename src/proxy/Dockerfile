# ==========================================
# Builder
# ==========================================
FROM golang:1.26 AS builder

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build -o /app/server ./main.go

# ==========================================
# Runner
# ==========================================
FROM gcr.io/distroless/static-debian12

COPY --from=builder --chmod=755 /app/server /server

USER nonroot:nonroot
EXPOSE 8080

ENTRYPOINT ["/server"]
