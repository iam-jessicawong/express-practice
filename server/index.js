import dotenv from "dotenv";
import express from "express";
import router from "./routes/index"

dotenv.config();
const app = express();
const port = process.env.PORT || 8080

try {
  app.use(express.json());
  app.use(router);
  
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  })
  
} catch (error) {
  console.log("error starting server: ", error);
}