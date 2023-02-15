const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8080;

http.createServer((req, res) => {
  // Analyse l'URL de la requête entrante
  const parsedUrl = url.parse(req.url, true);

  // Extrait le chemin demandé
  const pathname = `.${parsedUrl.pathname}`;

  // Vérifie si le chemin correspond à un fichier JavaScript
  const extname = path.extname(pathname);
  if (extname === '.js') {
    // Renvoie le fichier JavaScript avec le type de contenu MIME 'application/javascript'
    res.setHeader('Content-Type', 'application/javascript');
    fs.readFile(pathname, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end(`File ${pathname} not found!`);
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  } else {
    // Renvoie le fichier HTML pour les autres requêtes
    fs.readFile('./index.html', (error, html) => {
      if (error) throw error;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(html);
      res.end();
    });
  }
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
