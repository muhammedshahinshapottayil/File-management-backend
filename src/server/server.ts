import app from "../app";
import Env from "../env";
const port = Env.PORT;
app.set(port.toString(), port);
app.listen(port, () => {
  console.log("Running on ", port);
});
