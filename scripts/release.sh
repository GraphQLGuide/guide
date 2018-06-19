#!/bin/bash
# 
# usage: release.sh version

# args: branch, version
release_branch () {
  git checkout $1
  git tag $1_$2
}

COUNTER=0
until [ $COUNTER -gt 18 ]; do
    release_branch $COUNTER $1
    let COUNTER+=1
done

git push origin --tags