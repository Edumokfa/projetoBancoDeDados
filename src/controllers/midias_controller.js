const Midia = require('../models/midia');

exports.create = async function(req, res) {
    try {
        const file = req.file.path
        const newMidia = req.body;
        newMidia["arquivo"] = file;
        const midia = await Midia.createMidia(newMidia);
        res.status(201).json({ data: midia });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao criar mídia' });
    }
};