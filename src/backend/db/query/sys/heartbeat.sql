-- query.sql
-- name: UpdateHeartbeat :one
UPDATE sys.heartbeats
SET
    at = NOW ()
WHERE
    id = 1 RETURNING at;
