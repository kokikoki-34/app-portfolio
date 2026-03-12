#!/usr/bin/env bash
set -euo pipefail

# --------------------------------------
# Path Resolution (Location Independent)
# --------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="$(cd "$SCRIPT_DIR/.." && pwd)/docker-compose.yaml"

# --------------------------------------
# Variables
# --------------------------------------
ATLAS_SERVICE="atlas-migrate"
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
  docker compose -f "$COMPOSE_FILE" down -v > /dev/null 2>&1
}

main(){
  trap cleanup EXIT SIGINT SIGTERM

  echo $COMPOSE_FILE

  local migration_name="${1:-""}"
  if [[ -z "$migration_name" ]]; then
    log "ERROR" "No migration description provided"
    echo "Usage: $0 <description>"
    exit 1
  fi

  cleanup

  log "INFO" "Migration creating: $migration_name"

  export MIGRATION_NAME="$migration_name"

  if ! docker compose -f "$COMPOSE_FILE" run --rm --quiet-pull --quiet-build atlas-migrate; then
      log "ERROR" "Atlas migration failed."
      exit 1
  fi

  log "INFO" "Migration diff generated successfully"
}

# --------------------------------------
# Run Main
# --------------------------------------
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  main "$@"
fi
