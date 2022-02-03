FROM node:16.13.0-alpine

ARG WORKDIR
ARG API_URL
# ARG CONTAINER_PORT

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    # コンテナのNuxt.jsをブラウザから参照するためにip:0.0.0.0に紐付ける
    HOST=0.0.0.0 \
    API_URL=${API_URL}

WORKDIR ${HOME}

COPY package*.json ./
RUN yarn install

COPY . ./

RUN yarn run build

# http://localhost(0.0.0.0):3000
# EXPOSE ${CONTAINER_PORT}
