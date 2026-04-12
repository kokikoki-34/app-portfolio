-- Add new schema named "sys"
CREATE SCHEMA "sys";
-- Create "heartbeats" table
CREATE TABLE "sys"."heartbeats" (
  "id" integer NOT NULL,
  "at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id")
);
