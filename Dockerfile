FROM node

USER root

WORKDIR /usr/src

COPY . .

EXPOSE 5050

RUN npm i 
RUN npm run build


USER node

CMD ["npm", "start"]