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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/isAProjects.ts
var isAProjects_exports = {};
__export(isAProjects_exports, {
  default: () => isAvailableProject,
  isEmpty: () => isEmpty
});
module.exports = __toCommonJS(isAProjects_exports);
var import_validator = __toESM(require("validator"));
function isAvailableProject(project) {
  try {
    if (project.title.length >= 2 && project.description.length <= 170 && project.description.length >= 2 && import_validator.default.isURL(project.repo) && project.category) {
      if (project.deploy && !import_validator.default.isURL(project.deploy)) {
        return false;
      }
      const empty = project.tecnologies.some((tec) => {
        return isEmpty(tec);
      });
      if (!empty) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
}
function isEmpty(str) {
  return str.length == 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isEmpty
});
