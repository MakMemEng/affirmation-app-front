FROM node:16.3.0-alpine3.12

ARG WORKDIR
# dev環境
ARG API_URL

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    # コンテナのNuxt.jsをブラウザから参照するためにip:0.0.0.0に紐付ける
    HOST=0.0.0.0 \
# dev環境
    API_URL=${API_URL}

WORKDIR ${HOME}

COPY package*.json ./
RUN apk update && \
    apk upgrade && \
    npm install -g n && \
    yarn install && \
    rm -rf /var/cache/apk/*

COPY . ./

# ADD . ${HOME}
# EXPOSE 3000
RUN yarn run build
# CMD ["yarn", "start"]
