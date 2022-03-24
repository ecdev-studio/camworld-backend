FROM 868285727925.dkr.ecr.us-west-2.amazonaws.com/node:16-alpine3.12

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

EXPOSE 5000
CMD [ "npm", "run", "start" ]