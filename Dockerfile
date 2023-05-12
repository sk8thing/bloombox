FROM node:lts
WORKDIR /app/src
COPY . .
RUN npm install
CMD ["npm", "start"]