# pull the base image
FROM node:alpine

# Create app directory
COPY . ./app



# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies

RUN yarn


EXPOSE 3000

# start app
CMD ["yarn", "start"]