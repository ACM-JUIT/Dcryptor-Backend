FROM node:14
USER root
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN apt-get update -y
RUN apt-get install python -y
RUN apt-get install python3-pip -y
RUN pip3 install -r requirements.txt
RUN npm start