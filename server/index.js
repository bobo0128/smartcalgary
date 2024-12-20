import "./src/config/envLoader.js";
import express from "express";
import showRequests from "./src/utils/showRequests.js";
import "./src/cronjob/index.js";
import routes from "./src/routes/index.js";
import { connectToDatabase } from "./src/utils/db/dbConn.js";
import cors from 'cors';




const port = process.env.PORT || 4000;
const app = express();

app.use(showRequests);

app.use(express.json());

app.use(routes);
app.use(cors({
  origin: 'https://smartcalgary.vercel.app/', // Replace with your frontend domain
  methods: ['GET'],
}));

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log("Server listening on port " + port);
  });
});
