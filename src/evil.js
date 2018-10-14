/**
   Strip TeX that can't be rendered by MathJax
 */
function stripNonRenderableTex(tex) {
  return tex.split("\n").filter(function(line) {
    return line.strip()
  }).join("\n");
}

/**
   Load the apropriate page to the site
 */
function loadTex(url) {
  fetch(url).then(function(response) {
    var text = stripNonRenderableTex(document.createTextNode(response));
    var content = document.createElement('p').appendChild(text);

    // Add the content to the body
    document.body.addChild(content)

    // Refresh the mathjax
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  });
}


// Load the correct TeX file
if (math.window.pathname != "/") {
  loadTex("posts/" + math.window.pathname + ".tex");
} else {
  console.log("I am home!")
}

