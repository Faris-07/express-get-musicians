const express = require("express");
const router = express.Router();
const {Musician} = require('../index');
const {sequelize} = require('../db');
const {check, validationResult} = require("express-validator");

router.get('/', async (req, res) => {
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
})

router.get('/:id', async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician)
})

router.use(express.json());
router.post('/', [check("name", "instrument").not().isEmpty().trim()], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    } else {
        const newMusician = req.body;
        await Musician.create(newMusician);
        const allMusicians = await Musician.findAll()
        res.json(allMusicians);
    }
})

router.use(express.json());
router.put('/:id', async (req, res) => {
    let id = req.params.id;
    req.body = {name: "Joe Schmo", instrument: "Drums"};
    const newMusician = req.body;
    await Musician.update(newMusician, { where: { id: id } } );
    const allMusicians = await Musician.findAll()
    res.json(allMusicians);
})

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    await Musician.destroy({ where: { id: id } });
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
})

module.exports = router;