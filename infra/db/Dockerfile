FROM postgres:18-alpine

COPY src/backend/db/schema/*.sql /docker-entrypoint-initdb.d/

ENV TZ=Asia/Tokyo
