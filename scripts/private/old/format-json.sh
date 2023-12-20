#!/bin/bash

#####
# Helper script for pretty formatting of json files
#####

for file in `ls -a app/products | grep -v \\\.\$`; do
  cat app/products/$file | python -mjson.tool > tmp.json
  rm app/products/$file
  mv tmp.json app/products/$file
done
