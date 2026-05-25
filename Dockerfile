FROM node:22-alpine
WORKDIR /app
COPY package.json tsconfig.json ./
COPY apps ./apps
COPY packages ./packages
COPY config ./config
RUN npm install
CMD ["npm","run","start:api"]
