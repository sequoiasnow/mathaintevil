#!/bin/sh

# Out with the old...
rm -rf docs

# Loop through all posts and generate html documents

for filename in posts/*.tex; do
    sanitized=$(echo "$filename" | awk -F '/' '{print $NF}' \
                    | tr '[:upper:]' '[:lower:]' \
                    | sed 's/ /-/g')
    url=$(basename $sanitized .tex)

    echo "Writing $filename to $url..."
    
    mkdir -p docs/$url

    # Remove everything but the body
    contents=$(pandoc "$filename" --ascii --mathjax | sed 's/{aligned}/{align}/g' | sed 's/^/  /')

    cat <<EOF | mustache - template.html.ms > docs/$url/index.html
---
title: $(basename "$filename" .tex)
content: | 
$contents 
---
EOF

   # Fix images 
   sed -i '' -E 's|src="figures/([^ ]+)"|src="../figures/\1.svg"|g' "docs/$url/index.html"
done

# Move the images

cp -R posts/figures docs/

# Move the html templates

cp *.html docs/

# Move the CNAME record

cp CNAME docs/
