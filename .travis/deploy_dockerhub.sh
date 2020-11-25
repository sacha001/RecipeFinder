#!/bin/sh
docker login -u $DOCKER_USER -p $DOCKER_PASS
<<<<<<< Updated upstream
if [ "$TRAVIS_BRANCH" = "master" ]; then
    TAG="latest"
else
    TAG="$TRAVIS_BRANCH"
fi
docker build -t $TRAVIS_REPO_SLUG:$TAG ./client
docker push $TRAVIS_REPO_SLUG:$TAG
=======
docker build -t "recipefinder:latest" ./client
docker push "recipefinder:latest"
>>>>>>> Stashed changes
