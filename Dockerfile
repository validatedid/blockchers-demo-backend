FROM node:12
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci --quiet --no-progress
COPY . /usr/src/app/
RUN npm run build
EXPOSE 9000
CMD sh start.sh
