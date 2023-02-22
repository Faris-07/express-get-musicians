const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;
app.use(express.json());

//TODO
app.get('/musicians', async (req, res) => {
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
})

app.get('/musicians/:id', async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician)
})


app.post('/musicians', async (req, res) => {
    req.body = {name: "Joe Schmo", instrument: "Drums"};
    const newMusician = req.body;
    await Musician.create(newMusician);
    res.send("Muscian has been created");
})
  
  app.put("/musicians/:id", async (req, res) => {
    const { id } = req.params;
    const musician = await Musician.findByPk(id);
    const { name, instrument } = req.body;
    if (name && instrument) {
      await musician.update({ name: name, instrument: instrument });
    } else if (name) {
      await musician.update({ name: name });
    } else if (instrument) {
      await musician.update({ instrument: instrument });
    }
    res.send("Updated Musician Sucessfully");
  });
  
  app.delete("/musicians/:id", async (req, res) => {
    const { id } = req.params;
    Musician.destroy({ where: { id: id } });
    res.send("Deleted Musician");
  });

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})