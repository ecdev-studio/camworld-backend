FROM node:16-alpine3.12

RUN mkdir -p /app/backend.ecdevstudio.com
WORKDIR /app/backend.ecdevstudio.com

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 5559/tcp
ENV PORT 5559

CMD [ "npm", "run", "start" ]
