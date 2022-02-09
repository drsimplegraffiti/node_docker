FROM node:17-alpine
WORKDIR /backend
COPY . .
RUN npm install
EXPOSE 5000
CMD ["node", "backend/server.js"]