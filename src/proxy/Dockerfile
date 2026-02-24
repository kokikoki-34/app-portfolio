FROM nginx:alpine
COPY conf/default.conf /etc/nginx/templates/default.conf.template
EXPOSE 8080
CMD ["/bin/sh", "-c", "\
  export ID_TOKEN_BACKEND=$(curl -s -H 'Metadata-Flavor: Google' 'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience='$(echo $URL_BACKEND | sed 's|/$||')) && \
  export ID_TOKEN_FRONTEND=$(curl -s -H 'Metadata-Flavor: Google' 'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience='$(echo $URL_FRONTEND | sed 's|/$||')) && \
  envsubst '$URL_BACKEND $URL_FRONTEND $ID_TOKEN_BACKEND $ID_TOKEN_FRONTEND' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && \
  nginx -g 'daemon off;'"]
