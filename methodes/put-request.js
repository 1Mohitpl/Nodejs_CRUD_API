const body_req = require("../util/body-parse");
const writeTofile = require("../util/write_to_file");

const put_req = async (req, res) => {
    let baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let id = req.url.split("/").pop(); // Get the last part of the URL
    let movieId = parseInt(id, 10); // Convert id to an integer
    
    if (!isNaN(movieId) && baseURL === "/api/movies/") {
        try {
            let body = await body_req(req); // Get the body data from the request
            
            // Find the movie by its ID
            let movieIndex = req.movies.findIndex((movie) => movie.id === movieId);

            if (movieIndex !== -1) {
                // Movie found, update it with the new data
                req.movies[movieIndex] = { ...req.movies[movieIndex], ...body };
                
                // Write updated movies array to file
                writeTofile(req.movies);
                
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({
                    message: `Movie with id ${movieId} updated successfully`,
                    updatedMovie: req.movies[movieIndex], // Return the updated movie
                }));
            } else {
                // Movie not found
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: `Movie with id ${movieId} not found` }));
            }
        } catch (error) {
            console.error("Error processing PUT request:", error);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid data format" }));
        }
    } else {
        // Invalid URL
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Resource not found" }));
    }
};

module.exports = { put_req };
