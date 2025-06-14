/** @file Code and definitions common to all actions. */
/** @typedef {Map<string, string | string[]>} ArgMapping */
/** @typedef {(world: object, args: Map) => any} ActionFunction */
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

export default Object.freeze({
  dictionaryUnion,
});
