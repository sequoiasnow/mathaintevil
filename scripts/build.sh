#!/bin/sh

# Out with the old...
rm -rf docs

# Loop through all posts and generate html documents

for filename in posts/*.tex; do
    sanitized=$(echo "$filename" | awk -F '/' '{print $NF}' \
                    | tr '[:upper:]' '[:lower:]' \
                    | sed 's/ /-/g')
    url=$(basename $sanitized .tex)

    echo "Writing $url..."
    
    mkdir -p docs/$url

    # Remove everything but the body
    contents=$(pandoc $filename --ascii --mathjax | sed 's/{aligned}/{align}/g' | sed 's/^/  /')

    cat <<EOF | mustache - template.html.ms > docs/$url/index.html
---
content: | 
$contents 
title: $(basename $filename .tex)
---
EOF
done

# Move the html templates

cp *.html docs/

# Move the CNAME record

cp CNAME docs/
