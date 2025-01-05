const { log } = require("console");
const http = require("http");
let movies = require("./data/movies_data.json");
const { get_request, post_request, delete_req, put_req } = require("./methodes/Routes");
const PORT = process.env.PORT || 4000;

// Create HTTP server
const server = http.createServer((req, res) => {
    req.movies = movies; // Attach movies to req object

    switch (req.method) { // Use req.method instead of res.method
        case "GET":
            get_request(req, res);
            break;
        case "POST":
            post_request(req, res);
            break;
        case "PUT":
            put_req(req, res);
            break;
        case "DELETE":
            delete_req(req, res);
            break;
        default:
            res.writeHead(405, { "Content-Type": "application/json" }); // 405 for unsupported methods
            res.end(JSON.stringify({ message: "Method not allowed" }));
    }
});

server.listen(PORT, () => {
    log(`Server is running on port: ${PORT}`);
});

