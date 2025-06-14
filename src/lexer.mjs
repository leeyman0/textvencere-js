/** @typedef {{ action: string, object?: string, at?: string, to?: string, from?: string, on?: string, with?: string, into?: string }} UserAction */

const FLUFF_WORDS = ["the", "a", "an"];
const PREPOSITIONS = ["at", "to", "from", "on", "into", "with"];

/**
 * Turns a human-readable string into a machine-readable intermediate representation of an action.
 *
 * How it works:
 * 1. In english, the verb phrase always comes in the first place of the word. So that becomes the action.
 * 2. The fluff words are trimmed out, like the and a
 * 3. The prepositions are broken out with their objects
 *
 * @param {string} str the string to lex
 *
 * @returns {UserAction} the parsed action
 */
function lex(str) {
  let segments = str
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((seg) => seg !== "")
    .filter((seg) => !FLUFF_WORDS.includes(seg));

  // Build the action from scratch
  let retAction = {
    action: segments[0] || "none",
  };

  // Parse the prepositions, going word by word
  let current_preposition = "object";
  let current_phrase = "";
  segments.slice(1).forEach((seg) => {
    if (PREPOSITIONS.includes(seg)) {
      retAction[current_preposition] = current_phrase.trimStart();
      (current_preposition = seg), (current_phrase = "");
    } else {
      current_phrase += " " + seg;
    }
  });

  // Getting the last phrase in there
  if (current_phrase !== "") {
    retAction[current_preposition] = current_phrase.trimStart();
  }

  // Return the action
  return retAction;
}

export default Object.freeze({
  lex,
});
