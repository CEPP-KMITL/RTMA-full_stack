#Stage 1
FROM node:13.14-alpine as builder
WORKDIR /frontend-app
COPY package*.json ./
ARG NODE_ENV
RUN npm install && npm install --only=dev
RUN npm install -g @quasar/cli
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=builder /frontend-app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
