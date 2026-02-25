FROM openresty/openresty:alpine-fat

RUN luarocks install lua-resty-http

COPY conf/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY auth.lua /etc/nginx/lua/auth.lua

EXPOSE 8080

CMD ["openresty", "-g", "daemon off;"]
