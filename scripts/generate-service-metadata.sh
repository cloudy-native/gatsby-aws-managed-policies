#!/bin/sh

# Convert CSV to array of JSON
#
curl -s https://raw.githubusercontent.com/lesterw1/AwsServices/master/AwsServices.csv \
    | sed '1d' \
    | csv-parser \
    | jq -s '.' \
        > metadata/service-metadata.json
