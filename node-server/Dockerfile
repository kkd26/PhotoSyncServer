FROM node:18
ARG APPPATH
WORKDIR ${APPPATH}
COPY package*.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]
