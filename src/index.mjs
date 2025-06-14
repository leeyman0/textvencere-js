import readline from "node:readline/promises";
import lexer from "./lexer.mjs";

const PLAYER_PROMPT = "player> ";

const textInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let quit = false;

function readLoop() {
  return textInterface
    .question(PLAYER_PROMPT)
    .then((userInput) => {
      // Log the user input
      console.log(userInput);
      // Normalize the user input
      userInput = userInput.trim().toLowerCase();

      quit = userInput === "quit" || userInput === "q";
      // Cut the action into pieces
      let parsedAction = lexer.lex(userInput);

      console.log("parsed action:", parsedAction);
    })
    .catch((error) => {
      console.error(error);
    })
    .then(() => {
      if (!quit) readLoop();
      else {
        // Run shutdown code
        textInterface.close();
        process.exit(0);
      }
    });
}
readLoop();
