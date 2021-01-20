#!/bin/bash
echo '*******************************'
echo '*                             *'
echo '*                             *'
echo '*                             *'
echo '*       server service        *'
echo '*                             *'
echo '*                             *'
echo '*                             *'
echo '*                             *'
echo '*******************************'
cd ./server
yarn
yarn build
echo '*******************************'
echo '*                             *'
echo '*                             *'
echo '*                             *'
echo '*       client service        *'
echo '*                             *'
echo '*                             *'
echo '*                             *'
echo '*                             *'
echo '*******************************'
cd ..
cd ./client
yarn
echo '*******************************'
echo '*                             *'
echo '*                             *'
echo '*                             *'
echo '*       composer up           *'
echo '*                             *'
echo '*                             *'
echo '*                             *'
echo '*                             *'
echo '*******************************'
cd ..
docker-compose up
