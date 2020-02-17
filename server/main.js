import express from "express";
import cors from "cors";
import bp from "body-parser";
import pokemonController from "./controllers/PokemonController";
import PokemonController from "./controllers/PokemonController";

let server = express();

const port = 3000;

var whitelist = ["http://localhost:8080"];
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
}

server.use(cors(corsOptions));

server.use(bp.urlencoded({ extended: true }))
server.use(bp.json());

server.use("/api/pokemon", new PokemonController().router);


server.use((req, res, next) => {
  res.status(404).send("route not found");
})

server.listen(port, () => {
  console.log("Server Running on port:", port);
})