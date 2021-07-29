FROM node:14.17.3
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


# #Stage 1
# FROM node:14.17.3 as builder
# WORKDIR /backend-app
# COPY package*.json .
# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "development" ]; \
#     then npm install; \
#     else npm install --only=production; \
#     fi
# RUN npm i -g rimraf
# RUN npm i -g tsc
# COPY . /backend-app
# RUN npm run build

# #Stage 2
# FROM node:14.17.3
# WORKDIR /backend-app
# COPY package*.json .
# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "production" ]; \
#     then npm install; \
#     else npm install --only=production; \
#     fi
# COPY --from=builder /backend-app/dist ./dist

# ENV PORT 3000
# EXPOSE $PORT
# CMD npm run start