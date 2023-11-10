import express, { json } from "express";
import "express-async-errors";
import routes from "./frameworks/routes";
import dbConnection from "./config/dbConfig";
import dependencies from "./config/dependencies";
import cors from "cors";
import env from "./env";
const app = express();
const port = env.PORT;

const {
  Common: { NotFound, errorhandler },
} = dependencies;
dbConnection(dependencies);
app.use(json());
app.use(cors());
app.use("/api", routes(dependencies));
app.all("*", () => {
  throw new NotFound();
});
app.use(errorhandler);
app.listen(port, () => {
  console.log("Running on ", port);
});

export default app;
