FROM node:16.14.0 as build
ENV PATH /node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
# COPY .npmrc ./
RUN npm ci
COPY . ./
RUN npm run build

FROM nginx:1.16.1-alpine
COPY /ci/nginx.conf /data/conf/nginx.conf
COPY --from=dist /dist /usr/share/nginx/html
EXPOSE 80

WORKDIR /usr/share/nginx/html
COPY ./ci/env.sh .
COPY .env-vars .
RUN apk add --no-cache bash
RUN chmod +x /usr/share/nginx/html/env.sh

CMD /bin/bash -c "/usr/share/nginx/html/env.sh" && nginx -g "daemon off;" -c "/data/conf/nginx.conf"
