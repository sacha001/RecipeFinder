#!/bin/sh
docker login -u $DOCKER_USER -p $DOCKER_PASS
docker build -t "recipefinder:latest" ./client
docker push "recipefinder:latest"
