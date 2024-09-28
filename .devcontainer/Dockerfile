# image type: node
FROM node:14.17.4 
# in case you are using lambda or AWS, only selected node version is supported

# node may come with an older version of npm. Ensure we have a specific npm.
RUN npm install -g npm@6.14.14
# the npm version is set depending on the node version

RUN npm install -g serve

# ################################################################################
# # Install prerequisites
# # make sure the information of package is updated
# RUN apt-get clean

# RUN apt-get update

# # # find out which distro we are running inside the container
# RUN apt-get install -y \
#     # lsb-release \
#     curl