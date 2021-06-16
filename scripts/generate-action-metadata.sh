#!/bin/sh

# Convert CSV to array of JSON
#
curl -s https://raw.githubusercontent.com/lesterw1/AwsServices/master/AwsServiceActions.csv \
    | grep -v '^#' \
    | csv-parser \
    | jq -s '.' \
        > metadata/action-metadata.json
