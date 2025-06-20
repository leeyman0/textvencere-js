/** @file implements basic actions for observing and exploring the world */
import * as ac from "./actionsCommon.mjs";

function look(world, args) {}

/** @type {ac.ActionScheme} */
const lookActionScheme = {
  act: look,
  description: `look [at | to] something
gives a visual description of a thing currently within your sight.`,
  argmap: new Map([["subject", ["at", "to", "object"]]]),
};

/** @type {ac.ActionDictionary} */
const basicDictionary = new Map([
  ["look", lookActionScheme],
  ["l", lookActionScheme],
]);

export default Object.freeze({
  basicDictionary,
});
