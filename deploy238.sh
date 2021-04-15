#!/bin/bash
tar  czvf  myApp.tar.gz   --exclude 'node_modules'   --exclude '.git'   .
scp  myApp.tar.gz gajendra.chaturvedi@192.168.5.238:/srv/apps
rm myApp.tar.gz
ssh -T gajendra.chaturvedi@192.168.5.238 << 'ENDSSH'
cd ../
cd /srv/apps
pm2 stop 238-unit-ch
rm -rf 238-unit-ch
mkdir 238-unit-ch
tar -xf myApp.tar.gz -C 238-unit-ch
rm -rf myApp.tar.gz
#rm myApp.tar.gz
cd 238-unit-ch
npm install
#yarn build
 pm2 start  238-unit-ch
ENDSSH
