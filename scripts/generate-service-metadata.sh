#!/bin/sh

# Convert CSV to array of JSON
#
curl -s https://raw.githubusercontent.com/awsles/AwsServices/master/AwsServices.csv \
    | sed '1d' \
    | mlr --c2j cat \
    | jq -s '.[]' \
        > metadata/service-metadata.json
