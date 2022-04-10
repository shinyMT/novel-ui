# This dockerfile uses the ubuntu image
# Author: thy
# MAINTAINER: shinyMT@163.com

FROM nginx
# 删除目录下的default.conf
RUN rm /etc/nginx/conf.d/default.conf

# 将default.conf复制到指定目录下，用本地的default.conf来替换默认的文件
COPY nginx.conf /etc/nginx/conf.d/

# 将根目录下的dist文件夹复制到镜像中
COPY dist/ /usr/share/nginx/html/