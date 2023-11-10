import { cleanEnv, str, port } from "envalid";
const env = cleanEnv(process.env, {
  PORT: port({ default: 4000 }),
  DB_URL: str({
    default:
      "mongodb+srv://filemanager:filemanager@filemanager.r2juglt.mongodb.net/?retryWrites=true&w=majority",
  }),
  SIGNATURE: str({ default: "8ZpEBn9i5rRk" }),
  NODE_ENV: str({ default: "Development" }),
  USER_COLLECTION: str({ default: "users" }),
  CLOUD_NAME: str({ default: "diwv5i7fw" }),
  API_KEY: str({ default: "951986381765568" }),
  API_SECRET: str({ default: "tyTxPpweUE02tYIuWhsTAsTfqRI" }),
});
export default env;
