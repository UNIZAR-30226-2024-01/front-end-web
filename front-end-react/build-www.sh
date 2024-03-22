#!/bin/bash

cd /home/ubuntu/grace-hopper-01/front-end-web/front-end-react

export PATH=/home/ubuntu/.nvm/versions/node/v21.7.1/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
npm run build
echo 'build completado'

sudo rm -r /var/www/dist
sudo mv dist /var/www/