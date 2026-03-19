-- query.sql
-- name: UpdateHeartbeat :one
INSERT INTO
    sys.heartbeats (id, at)
VALUES
    (1, NOW ()) ON CONFLICT (id) DO
UPDATE
SET
    at = EXCLUDED.at RETURNING at;
