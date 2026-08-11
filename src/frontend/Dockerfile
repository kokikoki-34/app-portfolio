# ==========================================
# Stage 1: Builder (Node.js)
# ==========================================
FROM node:latest AS builder

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
