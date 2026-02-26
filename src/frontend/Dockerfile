# ==========================================
# Stage 1: Builder (Node.js)
# ==========================================
FROM node:lts-alpine3.22 AS builder

ARG VITE_URL_BACKEND
ARG VITE_PORT_BACKEND

ENV VITE_URL_BACKEND=$VITE_URL_BACKEND
ENV VITE_PORT_BACKEND=$VITE_PORT_BACKEND

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# ==========================================
# Stage 2: Runner (Nginx)
# ==========================================
FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
