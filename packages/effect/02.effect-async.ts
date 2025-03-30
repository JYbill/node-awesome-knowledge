import {Effect} from "effect";

async function main() {
  const delay = (message: string) =>
    Effect.promise<string>(() =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(message)
        }, 2000)
      }))
  const program = delay("Async operation completed successfully!") // Effect<string, never, never>
  const result = await Effect.runPromise(program);
  console.log("result", result);
}
void main();
