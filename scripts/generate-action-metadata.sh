#!/bin/sh

# Convert CSV to array of JSON
#
curl -s https://raw.githubusercontent.com/awsles/AwsServices/master/AwsServiceActions.csv \
    | sed '1d;3,4d' \
    | mlr --c2j cat \
    | jq -s '.[]' \
        > metadata/action-metadata.json
