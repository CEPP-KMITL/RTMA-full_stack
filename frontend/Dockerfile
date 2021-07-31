FROM node:13.14-alpine
WORKDIR /frontend-app
COPY package*.json .
RUN npm install -g @quasar/cli

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install; \
  else npm install --only=production; \
  fi

COPY . ./frontend-app
ENV PORT 8080
EXPOSE $PORT
CMD ["npm","run","serve"]

