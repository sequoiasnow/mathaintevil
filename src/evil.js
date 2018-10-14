/**
   Strip TeX that can't be rendered by MathJax
 */
function stripNonRenderableTex(tex) {
  return tex.split("\n").filter(function(line) {
    return line.indexOf("usepackage") == -1 
  }).join("\n");
}

/**
   Load the apropriate page to the site
 */
function loadTex(url) {
  fetch(url)
    .then(function(r) { return r.text() })
    .then(function(raw) {
      var text = stripNonRenderableTex(document.createTextNode(raw));
      var content = document.createElement('p').appendChild(text);

      // Add the content to the body
      document.body.addChild(content);

    // Refresh the mathjax
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  }).catch(function(error) {
    console.warn(error);
    if (url != "posts/404.tex") {
      loadTex("posts/404.tex");
    } else {
      document.body.innerHTML = "Something is terribly, terribly wrong!"
    }
  });
}


// Load the correct TeX file
function start() {
  path = window.location.pathname.split('/').pop()

  if (path) {
    loadTex("posts/" + path + ".tex");
  } else {
    console.log("I am home!")
  }
}

window.onload = start;

