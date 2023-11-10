"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const env = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.port)({ default: 4000 }),
    DB_URL: (0, envalid_1.str)({
        default: "mongodb+srv://filemanager:filemanager@filemanager.r2juglt.mongodb.net/?retryWrites=true&w=majority",
    }),
    SIGNATURE: (0, envalid_1.str)({ default: "8ZpEBn9i5rRk" }),
    NODE_ENV: (0, envalid_1.str)({ default: "Development" }),
    USER_COLLECTION: (0, envalid_1.str)({ default: "users" }),
    CLOUD_NAME: (0, envalid_1.str)({ default: "diwv5i7fw" }),
    API_KEY: (0, envalid_1.str)({ default: "951986381765568" }),
    API_SECRET: (0, envalid_1.str)({ default: "tyTxPpweUE02tYIuWhsTAsTfqRI" }),
});
exports.default = env;
