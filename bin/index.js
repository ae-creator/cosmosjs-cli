"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_prompts2 = require("@inquirer/prompts");

// src/commands/index.ts
var commands_exports = {};
__export(commands_exports, {
  init: () => init
});

// src/commands/init.ts
var import_node_child_process = require("child_process");
var path = __toESM(require("path"));
var import_prompts = require("@inquirer/prompts");
var util = __toESM(require("util"));

// src/utils/delay.ts
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// src/commands/init.ts
var exec = util.promisify(require("child_process").exec);
async function init() {
  const packageName = await (0, import_prompts.input)({ message: "package name" });
  const outFolder = await (0, import_prompts.input)({ message: "folder output", default: "." });
  const templateLink = "github.com/ae-creator/cosmosjs-core-template";
  const packageFileName = "package.json";
  try {
    const { stdout, stderr } = await exec(`bun create ${templateLink}  ${outFolder}`);
    await delay(1e3);
    const packageFile = require(path.join(__dirname, `${outFolder}/${packageFileName}`));
    packageFile.name = packageName;
  } catch (error) {
    console.error(error);
  }
}

// src/index.ts
async function runCli() {
  const selectedCommand = await (0, import_prompts2.select)({
    message: "Select options",
    choices: [
      {
        name: "init",
        description: "init your application",
        value: "init"
      }
    ]
  });
  const command = commands_exports[selectedCommand];
  await command();
}
runCli();
