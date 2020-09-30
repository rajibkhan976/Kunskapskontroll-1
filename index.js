const http = require("http") ;
const fs = require('fs').promises;
var personnummer = require("personnummer.js");

const host = 'localhost';
const port = 3000;

const requestListener = function (req, res) {
	switch (req.url) {
		case "/":
		fs.readFile(__dirname + "/public.txt")
        .then(contents => {
            res.setHeader("Content-Type", "text/text");
            res.writeHead(200);
            res.end(contents);
        })
		break
		case "/secret?key=ALBATROSS":
		fs.readFile(__dirname + "/secret.html")
			.then(contents => {
				res.setHeader("Content-Type", "text/html");
				res.writeHead(200);
				res.end(contents);
			})
			.catch(err => {
				console.error(`Could not read index.html file: ${err}`);
				process.exit(1);
			});
		break
		case "/780422-4433":
		if (personnummer.validate("780422-4433")) {
			res.writeHead(200);
			res.end("This is a valid personnummer!");
		} else {
			res.writeHead(200);
			res.end("This is not a valid personnummer!");
		}
		break
		default:
            res.writeHead(404);
            res.end(JSON.stringify({error:"Resource not found"}));
	}
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});