const get_request = (req, res) => {
    let baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let id = req.url.split("/").pop(); // Get the last part of the URL
    let movieId = parseInt(id, 10); // Convert id to an integer

    if (req.url === "/api/movies") {
        // Return all movies
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(req.movies)); // Use req.movies to access all movies
        res.end();
    } else if (!isNaN(movieId) && baseURL === "/api/movies/") {
        // Access a specific movie by its ID
        let filteredMovie = req.movies.find((movie) => movie.id === movieId);

        if (filteredMovie) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(filteredMovie)); // Return the matched movie
        } else {
            // Movie with the given ID not found
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Movie with id ${movieId} not found` }));
        }
    } else {
        // Handle invalid URLs or methods
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Resource not found" }));
    }
};

module.exports = { get_request };
