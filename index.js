//import dependencies
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

//router imports
import trackRoutes from "./routes/tracks.js";
import siteRoutes from "./routes/site.js";
import testRoutes from "./routes/test.js";
import runBot from "./utils/bot.js";


//making instance
const app = express();
dotenv.config();

//middleware
app.use(express.json({ extented: false }));
app.use(cors());

//inserting  router
app.use("/api/tracks", trackRoutes);
app.use("/api/test", testRoutes);
app.use("/api/sites", siteRoutes);

if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

//Server listening to port
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

//Connect database
connectDB();
setInterval(runBot, 600000);