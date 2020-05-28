"use strict";

require("source-map-support").install();
require("ts-node").register({ files: true });

exports.createPages = require("./gatsby/create-pages").createPages;
exports.onCreateNode = require("./gatsby/on-create-node").onCreateNode;
