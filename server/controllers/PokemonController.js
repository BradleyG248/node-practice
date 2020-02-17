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
      .put(":/id", this.edit)
      .delete(":/id", this.delete)
  }
  getAll(req, res, next) {
    res.send(POKEMONDB)
  }
  getById(req, res, next) {
    let pokemon = POKEMONDB.find(p => p.id == req.params.id);
    if (!pokemon) {
      return res.status(400).send("Invalid ID");
    }
    res.send(pokemon);
  }
  create(req, res, next) {
    let newPokemon = {
      id: POKEMONDB.length + 1,
      name: req.body.name || ""
    };
    POKEMONDB.push(newPokemon);
    return res.send(newPokemon);
  }
  edit(req, res, next) {
    let pokemon = POKEMONDB.find(p => p.id == req.params.id);
    if (!pokemon) {
      return res.status(400).send("Invalid ID");
    }
    pokemon[req.params.val] = req.body.val;
    return res.send(pokemon)
  }
  delete(req, res, next) {

  }
}