#!/bin/bash
tar  czvf  myApp.tar.gz   --exclude '.git'   --exclude 'node_modules'  .
scp  myApp.tar.gz gajendra.chaturvedi@192.168.5.237:/srv/apps
rm myApp.tar.gz
ssh -T gajendra.chaturvedi@192.168.5.237 << 'ENDSSH'
cd ../
cd /srv/apps
pm2 stop 237-unit-ch
rm -rf 237-unit-ch
rm -rf 238-unit-ch
mkdir 237-unit-ch
tar -xf myApp.tar.gz -C 237-unit-ch
rm -rf myApp.tar.gz
#rm myApp.tar.gz
cd 237-unit-ch
npm install
#yarn build
 pm2 start  237-unit-ch
ENDSSH
