FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8083
ENTRYPOINT ["node", "index.js"]