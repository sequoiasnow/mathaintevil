#!/bin/sh

template_nav=$(cat <<EOF | sed 's/^/  /'
<a href="/">Home</a>
EOF
)

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
nav: |
$template_nav
---
EOF
done

# Move the source code

mkdir -p docs/js
mkdir -p docs/css

cp src/evil.js docs/js/
cp src/evil.css docs/css/

# Move the index templates

cp *.html docs/
