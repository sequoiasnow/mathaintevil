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
    var text = stripNonRenderableTex(document.createTextNode(response.text()));
    var content = document.createElement('p').appendChild(text);

    // Add the content to the body
    document.body.addChild(content)

    // Refresh the mathjax
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  }).catch(function(error) {
    if (url != "posts/404.tex") {
      loadTex("posts/404.tex");
    } else {
      body.innerHTML = "Something is terribly, terribly wrong!"
    }
  });
}


// Load the correct TeX file
if (window.location.pathname != "/") {
  loadTex("posts" + window.location.pathname + ".tex");
} else {
  console.log("I am home!")
}

