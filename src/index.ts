import express from "express";
import dotenv from "dotenv";
import { default as router } from "./routes/index";
import cors from "cors";
import corsOptions from "./utils/cors/allowedOrigin";
import errorHandler from "./utils/Errors/ErrorHandler";
// import swaggerDocs from "./swagger";

const app = express();

dotenv.config();

app.use(cors(corsOptions));
app.use(express.json());

app.use(router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening to PORT ${PORT}`);

  // swaggerDocs(app, PORT);
});
