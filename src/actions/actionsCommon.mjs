/** @file Code and definitions common to all actions. */
import * as lex from "../lexer.mjs";

/** Maps an internal argument name to a list of positions that take it.
 * @typedef {Map<string, string | string[]>} ArgMapping */
/** A function that simulates the effect of an action on a world.
 *
 * The world is the world object created by the simulation.
 *
 * The args are the arguments of the imperative statement in a map.
 * @typedef {(world: object, args: Map) => any} ActionFunction */
/** @typedef {{ act: ActionFunction, description?: string, argmap: ArgMapping }} ActionScheme */
/** @typedef {Map<string, ActionScheme>} ActionDictionary */

/**
 * Unifies multiple smaller dictionaries into one large dictionary.
 *
 * @param  {...ActionDictionary} ads the dictionaries to unify. Later dictionaries overwrite earlier ones
 *
 * @returns {ActionDictionary} the dictionary of all words in each of ads.
 */
function dictionaryUnion(...ads) {
  /** @type {ActionDictionary} */
  let ret_ad = new Map();

  // Unification by iteration through each entry of each map.
  for (const one_ad of ads) {
    for (const [key, val] of one_ad.entries()) {
      ret_ad.set(key, val);
    }
  }

  return ret_ad;
}

/**
 * Evaluates the result of a specific user action on a world.
 *
 * @param {ActionDictionary} ad a dictionary of actions that a user can take
 * @param {lex.UserAction} ua a parsed user action sentence
 * @param {object} world represents the world at large
 *
 */
function applyUserAction(ad, ua, world) {
  let scheme = ad.get(ua.action);

  if (scheme === undefined) {
    console.log(`Cannot find command ${ua.action}`);
    return;
  } else {
    // First, coalesce the arguments.
    let args = new Map(
      scheme.argmap.entries().map(([actionkey, usersyntax]) => {
        let esc;
        let positions = Array.isArray(usersyntax) ? usersyntax : [usersyntax];

        // Try to find a value for each argument by iterating through each position in the
        // command it could be in, and then taking the first one that it finds.
        for (let position of positions) {
          if (esc !== undefined) {
            esc = ua[position];
            break;
          }
        }
        return [actionkey, esc];
      })
    );

    // then, call the action on it
    scheme.act(world, args);
  }
}

export default Object.freeze({
  applyUserAction,
  dictionaryUnion,
});
