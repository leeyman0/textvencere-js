import * as act from "../src/actions/actionsCommon.mjs";
import lexer from "../src/lexer.mjs";
import ac from "../src/actions/actionsCommon.mjs";
import expect from "unexpected";

/** @type {act.ActionDictionary} */
let ad1 = new Map([
  [
    "echo",
    {
      act: (_wprld, args) => {
        console.log(args.get("arg1"));
        console.log("\t" + args.get("arg2"));
      },
      description: `act arg1 to arg2
prints arg1, and then arg2 on a separate line with a tab`,
      argmap: new Map([
        ["arg2", "to"],
        ["arg1", "object"],
      ]),
    },
  ],
]);

/** @type {act.ActionDictionary} */
let ad2 = new Map([
  [
    "parse",
    {
      act: (_world, argMap) => {
        for (const [k, v] of argMap.entries()) {
          console.log(`${k}:\t${v}`);
        }
      },
      definition: "Prints out its arguments.",
      argmap: new Map([...lexer.PREPOSITIONS.map((pr) => [pr, pr])]),
    },
  ],
]);

describe("actionsCommon", () => {
  describe("#dictionaryUnion(...ads)", () => {
    it("should unify two dictionaries", () => {
      // Unify the two dictionaries ad1 and ad2
      let unified = ac.dictionaryUnion(ad1, ad2);

      // This one just checks to see if everything exists
      // We can generalize this further, but I don't care to do it.
      for (const [k, _v] of ad1.entries()) {
        let getFromUnified = unified.get(k);
        expect(getFromUnified, "not to be undefined");
      }
      for (const [k, _v] of ad2.entries()) {
        let getFromUnified = unified.get(k);
        expect(getFromUnified, "not to be undefined");
      }
    });
  });
});
