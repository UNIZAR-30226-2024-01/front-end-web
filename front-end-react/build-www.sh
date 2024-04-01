#!/bin/bash

cd /home/ubuntu/grace-hopper-01/front-end-web/front-end-react

export PATH=/home/ubuntu/.nvm/versions/node/v21.7.1/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin

echo "Building web..."
npm i > /dev/null 2>&1
npm run build > /dev/null 2>&1

echo "Deploying web with nginx..."
sudo rm -r /var/www/dist
sudo mv dist /var/www/


echo;echo;echo "Grace Hopper 01 has been deployed!"
echo "http://ec2-51-20-246-74.eu-north-1.compute.amazonaws.com/"
