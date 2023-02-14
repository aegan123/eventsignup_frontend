FROM ubuntu:20.04

# install needed packages
RUN apt update
RUN apt install -y curl

# install node
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt -y install nodejs


# add image to repository
LABEL org.opencontainers.image.source https://github.com/asteriskiry/eventsignup_frontend