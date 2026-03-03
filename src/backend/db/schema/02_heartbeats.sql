-- schema.sql
CREATE TABLE
    sys.heartbeats (
        id INTEGER PRIMARY KEY,
        at TIMESTAMPTZ NOT NULL DEFAULT NOW ()
    );

INSERT INTO
    sys.heartbeats (id)
VALUES
    (1) ON CONFLICT (id) DO NOTHING;
