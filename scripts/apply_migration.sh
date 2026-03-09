#!/usr/bin/env bash
set -euo pipefail

# --------------------------------------
# Path Resolution
# --------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
COMPOSE_FILE="$PROJECT_ROOT/docker-compose.yaml"

# --------------------------------------
# Variables
# --------------------------------------
ATLAS_SERVICE="atlas-apply"
PROFILE_NAME="migration"

# --------------------------------------
# Functions
# --------------------------------------
log (){
  local level=$1
  local message=$2
  printf "%s %-7s %s \n" "$(date +"%Y-%m-%dT%H:%M:%S%z")" "[$level]" "$message"
}

cleanup() {
  log "INFO" "Cleaning up resources"
  # Clean up only the targeted profile's resources
  docker compose -f "$COMPOSE_FILE" --project-directory "$PROJECT_ROOT" --profile "$PROFILE_NAME" down -v > /dev/null 2>&1
}

main(){
  if [[ -z "${CONNECTION_STRING:-}" ]]; then
    log "ERROR" "CONNECTION_STRING environment variable is not set."
    exit 1
  fi

  trap cleanup EXIT SIGINT SIGTERM
  cleanup

  log "INFO" "Starting migration apply..."

  if ! CONNECTION_STRING="${CONNECTION_STRING}" \
    docker compose -f "$COMPOSE_FILE" \
    --project-directory "$PROJECT_ROOT" \
    --profile "$PROFILE_NAME" \
    up \
    --abort-on-container-exit \
    --quiet-pull \
    --attach "$ATLAS_SERVICE" \
    --exit-code-from "$ATLAS_SERVICE" \
    "$ATLAS_SERVICE"; then
    log "ERROR" "Migration apply failed."
    exit 1
  fi

  log "INFO" "Migration applied successfully"
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  main "$@"
fi
