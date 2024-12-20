"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/search.ts
var search_exports = {};
__export(search_exports, {
  SeacrhProjectbyTitle: () => SeacrhProjectbyTitle,
  default: () => SeachProjectById
});
module.exports = __toCommonJS(search_exports);
function SeachProjectById(id, projects) {
  const index = projects.findIndex((project) => {
    return project.id == id;
  });
  if (index < 0) {
    return false;
  }
  return projects[index];
}
function SeacrhProjectbyTitle(title, projects) {
  const index = projects.findIndex((project) => {
    return project.title == title;
  });
  if (index < 0) {
    return false;
  }
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SeacrhProjectbyTitle
});
