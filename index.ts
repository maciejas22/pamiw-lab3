import express from "express";
import router from "./routes/root.route";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const port = process.env.NODE_PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
