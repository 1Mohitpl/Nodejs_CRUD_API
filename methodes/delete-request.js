const writeToFile = require("../util/write_to_file");

const delete_req = (req, res) => {
  let baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/").pop(); // Get the last part of the URL
  let movieId = parseInt(id, 10); // Convert id to an integer

  if (!isNaN(movieId) && baseURL === "/api/movies/") {
    // Access a specific movie by its ID
    let movieIndex = req.movies.findIndex((movie) => movie.id === movieId);

    if (movieIndex !== -1) {
      // Remove the movie from the array
      const deletedMovie = req.movies.splice(movieIndex, 1);

      // Write updated movies array to file
      try {
        writeToFile(req.movies);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
          message: `Movie with id ${movieId} deleted successfully`,
          deletedMovie: deletedMovie[0],
        }));
      } catch (error) {
        console.error("Error writing to file:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
      }
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

module.exports = { delete_req };
