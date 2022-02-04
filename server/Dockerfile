FROM node:14-buster

# install cron
RUN apt-get update && apt-get -y install cron

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

# add github sha to environment from build arg
ARG GITHUB_SHA
ENV GITHUB_SHA=${GITHUB_SHA}

# cron setup
COPY ./cron/crontab /etc/cron.d/crontab
RUN chmod 0644 /etc/cron.d/crontab
RUN crontab /etc/cron.d/crontab
RUN touch /var/log/cron.log

EXPOSE 8000
CMD cron && node --max-old-space-size=4096 server/index.js
