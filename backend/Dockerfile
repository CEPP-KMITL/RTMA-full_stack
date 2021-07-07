FROM node:latest
WORKDIR /backend-app
COPY package*.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY . /backend-app
ENV PORT 3000
EXPOSE $PORT