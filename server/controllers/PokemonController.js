import express from "express";

let POKEMONDB = [
  { id: 1, name: "squirtle" },
  { id: 2, name: "bulbasaur" },
  { id: 3, name: "charmander" }
]



export default class PokemonController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
      .get("/:id", this.getById)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)
  }
  getAll(req, res, next) {
    res.send(POKEMONDB)
  }
  getById(req, res, next) {
    let pokemon = POKEMONDB.find(p => p.id == req.params.id);
    console.log(req)
    if (!pokemon) {
      return res.status(400).send("Invalid ID");
    }
    res.send(pokemon);
  }
  create(req, res, next) {
    let pokemon = req.body;
    pokemon.id = POKEMONDB.length + 1;
    pokemon.name = req.body.name || "Unknown... so far."
    POKEMONDB.push(pokemon);
    return res.send(pokemon);
  }
  edit(req, res, next) {
    let pokemon = POKEMONDB.find(p => p.id == req.params.id);
    if (!pokemon) {
      return res.status(400).send("Invalid ID");
    }
    pokemon = req.body;
    pokemon.id = req.params.id;
    POKEMONDB[req.params.id - 1] = pokemon;
    return res.send(pokemon)

  }
  delete(req, res, next) {
    let pokemon = POKEMONDB.filter(p => p.id != req.params.id);
    POKEMONDB = pokemon;
    return res.send(pokemon);

  }
}