# Stage 1: Get the Atlas binary from the official image
FROM arigaio/atlas:latest AS atlas-bin

# Stage 2: Use Alpine to provide a shell and utilities
FROM alpine:latest

# Copy the binary from the official image
COPY --from=atlas-bin /atlas /usr/local/bin/atlas

# Install any extra tools if needed (e.g., ca-certificates for cloud features)
RUN apk add --no-cache ca-certificates libc6-compat

WORKDIR /workspace

# Set the default entrypoint to sh so we can run scripts
ENTRYPOINT ["/bin/sh", "-c"]
