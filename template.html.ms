<!DOCTYPE html>
<head>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-127642687-1"></script>
  <script>
   window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());

   gtag('config', 'UA-127642687-1');
  </script>
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
     extensions: ["tex2jax.js", "TeX/AMSmath.js", "[Contrib]/physics/physics.js", "TeX/autoload-all.js"],
     jax: ["input/TeX", "output/SVG"],
   })
  </script>
  <script type="text/javascript" async
          src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=default">
  </script>
  <script type="text/javascript" src="../evil.js"></script>
</body>
