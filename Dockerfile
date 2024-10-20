FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json .
COPY . .
RUN npm i
EXPOSE 5173
RUN npm run dev
