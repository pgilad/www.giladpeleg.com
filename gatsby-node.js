"use strict";

require("source-map-support").install();
require("ts-node").register({ files: true });

exports.createPages = require("./src/gatsby/create-pages").createPages;
exports.onCreateNode = require("./src/gatsby/on-create-node").onCreateNode;
