const path = require("path");
const { compileProject } = require("../lib/compile");

compileProject({
  projectPath: path.resolve(__dirname, "../example/tsconfig.json"),
});
