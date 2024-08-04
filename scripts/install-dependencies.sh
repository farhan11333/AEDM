#!/bin/sh
yum -y update

# echo "Installing node"
# yum install -y gcc-c++ make
# curl -sL https://rpm.nodesource.com/setup_12.x | bash -
# yum install -y nodejs

echo "printing node version"
node -v
# echo "printing environment"
# echo $NODE_ENV
# install forever utility
# echo "Install forever"
# npm install forever -g

# install node modules
cd /home/ec2-user/sketchbox-api
npm install
