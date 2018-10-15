<!DOCTYPE html>
<head>
  <link rel="stylesheet" type="text/css" href="../evil.css" />
</head>
<body>
  <div id="nav"></div>
  <div class="content">
    <span class="post-title">{{title}}</span>
    {{{content}}}
  </div>
  <script type="text/x-mathjax-config">
   MathJax.Hub.Config({
     extensions: ["tex2jax.js", "TeX/AMSmath.js", "[Contrib]/physics/physics.js"],
     jax: ["input/TeX", "output/SVG"],
   })
  </script>
  <script type="text/javascript" async
          src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-MML-AM_CHTML">
  </script>
  <script type="text/javascript" src="../evil.js"></script>
</body>
