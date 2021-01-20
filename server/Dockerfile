# base image
FROM node:latest


# Create app directory
COPY . ./app

WORKDIR /app

#check intalations
RUN ls

# run yarn
RUN yarn global add ts-node typescript @types/express
RUN yarn


EXPOSE 5000

CMD ["yarn", "start:dev"]
