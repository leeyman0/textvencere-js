/** @file implements basic help actions */
import * as ac from "./actionsCommon.mjs";

function help(world, args) {}

/** @type {ac.ActionScheme} */
const helpAS = {
  act: help,
  description: `help function
Gives a simple description of a function.`,
  argmap: new Map([["function", "object"]]),
};

export default Object.freeze({});
