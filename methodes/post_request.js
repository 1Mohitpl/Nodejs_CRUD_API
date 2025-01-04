const crypto = require("crypto");
const body_req = require("../util/body-parse");
const { log } = require("console");

const post_request = async (req, res) => {
    if(req.url === "/api/movies") {
        try {
           let body = await body_req(req);
           // now i create random id 
           body.id = crypto.randomUUID();
           req.movies.push(body);
           res.writeHead(201, {"content-type" : "application/json"});
           res.end();
    } catch(err){
            console.log(err);
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Movie with id ${movieId} not found` }));
        }
      }
};
 

module.exports = {post_request};