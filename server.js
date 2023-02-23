const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")
const musicianRouter = require("./routes/Muscians");

const port = 3000;
app.use(express.json());
app.use("/musicians", musicianRouter);

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})