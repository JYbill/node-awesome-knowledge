// ❌ ERR_REQUIRE_ESM
// const m = require("./2-module.mjs");

import("./2-module.mjs").then((m) => {
  console.log(m);
  // m.update();
  // console.log(m);
});
