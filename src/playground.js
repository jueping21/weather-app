import express from "express";
import path from "path";
import url from "url";

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __public = path.join(__dirname, "../public");

app.use(express.static(__public));

app.get("/fun", (req, res)=>{
    res.send("hello I am a test");
})

// listen for the request
app.listen(8000, () => {
    console.log("Server is up on port 8000");
});
