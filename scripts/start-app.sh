#!/bin/sh
cd /home/ec2-user/sketchbox-api
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
DEBUG=sketchbox-api:* forever start index.js