"use strict";
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextServer = void 0;
const https_1 = require("firebase-functions/v2/https");
const logger = __importStar(require("firebase-functions/logger"));
const path_1 = require("path");
// The Next.js server is expected to be located at server.js within the standalone output
// Note: This relies on the file structure created by `next build` with `output: 'standalone'`
const serverPath = (0, path_1.resolve)(__dirname, "./server.js");
let server;
try {
    // Dynamically require the server.js from the standalone output
    server = require(serverPath);
}
catch (error) {
    logger.error("Failed to load Next.js standalone server:", serverPath, error);
    // If the server fails to load, we can't really do anything else
    // Throwing ensures the function deployment might fail clearly if server.js is missing
    throw new Error(`Could not load server at ${serverPath}`);
}
// Export the function, passing requests directly to the imported Next.js server handler
exports.nextServer = (0, https_1.onRequest)({
    memory: "1GiB",
    timeoutSeconds: 60,
}, (req, res) => {
    if (!server) {
        logger.error("Next.js server instance is not available.");
        res.status(500).send("Internal Server Error - Server not loaded");
        return;
    }
    // Assuming the required server exports a handler function or is directly callable
    // (The exact structure might need verification based on Next.js version)
    return server(req, res);
});
//# sourceMappingURL=index.js.map