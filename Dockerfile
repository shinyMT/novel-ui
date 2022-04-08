# This dockerfile uses the ubuntu image
# Author: thy
# MAINTAINER: shinyMT@163.com

FROM node:10

COPY ./ /novel-vue
WORKDIR /novel-vue
RUN npm install && npm run build

FROM nginx
RUN mkdir /novel-vue
COPY --from=0 /novel-vue/dist /novel-vue
COPY nginx.conf /etc/nginx/nginx.conf