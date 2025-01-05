const body_req = require("../util/body-parse");
const writeTofile = require("../util/write_to_file");

const post_request = async (req, res) => {
    if(req.url === "/api/movies") {
        try {
            let body = await body_req(req);
            
            // Generate sequential ID for new movie (e.g., 101, 102, ...)
            const maxId = req.movies.reduce((max, movie) => Math.max(max, movie.id), 0);
            body.id = maxId + 1; // Assign next sequential integer ID
            
            req.movies.push(body); // Push new movie to the array
            writeTofile(req.movies); // Write the updated list to the file
            
            res.writeHead(201, {"content-type" : "application/json"});
            res.end(JSON.stringify(body)); // Send the new movie with the generated ID
            
        } catch (err) {
            console.log(err);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid request data" }));
        }
    }
};

module.exports = { post_request };
