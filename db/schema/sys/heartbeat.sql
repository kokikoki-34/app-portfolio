-- schema.sql
CREATE SCHEMA IF NOT EXISTS sys;

CREATE TABLE
    sys.heartbeats (
        id INTEGER PRIMARY KEY,
        at TIMESTAMPTZ NOT NULL DEFAULT NOW ()
    );
