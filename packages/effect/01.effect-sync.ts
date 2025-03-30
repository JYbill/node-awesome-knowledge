import { Effect } from "effect"

const log = (message: string) => Effect.sync(() => {
    console.log(message)
  })
const program = log("Hello, World!");

Effect.runSync(program);
