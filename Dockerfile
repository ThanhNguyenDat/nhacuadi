FROM node:18-bullseye AS frontend-builder
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

ARG APP_NAME=nhacuadi
ARG APP_ROOT=/root
ARG APP_PROF


ENV TZ=Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# RUN apt-get update && apt-get install -y python3-opencv vim net-tools curl libturbojpeg0

ENV APP_DIR=$APP_ROOT/$APP_NAME
WORKDIR $APP_DIR

COPY . $APP_DIR/

RUN cd $APP_DIR/
RUN npm install --legacy-peer-deps
RUN npm run build:module
