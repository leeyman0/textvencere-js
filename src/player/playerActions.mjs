import * as ac from "../actions/actionsCommon.mjs";

function go(world, args) {}

/** @type {ac.ActionScheme} */
const goActionScheme = {
  act: go,
  description: `go [to] direction
makes the player walk in a direction`,
  argmap: new Map([["towards", ["to", "object"]]]),
};

/** @type {ac.ActionDictionary} */
const actionDictionary = new Map([
  ["go", goActionScheme],
  ["g", goActionScheme],
]);
