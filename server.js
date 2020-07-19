import React from "react";
import ReactDOM from "react-dom/server";
import express from 'express';
import path from 'path';
import App from "./src/App";

const app = express();
app.use("/build", express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
  const html = ReactDOM.renderToString(<App />);
  res.send(`
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#FFFFFF" />
  <title>Cockycode</title>
  <!--Adsende needed code-->
  <!--<script data-ad-client="ca-pub-4420228501444963" async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>-->
  <!--Google analytics code-->
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-170243024-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'UA-170243024-1');
  </script>

</head>

<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root">${html}</div>
</body>

</html>
  `);
  /*res.sendFile(path.join(__dirname, 'build', 'index.html'),function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });*/
});
app.listen(80);