const services = require('../services/index');
const controller = {}

controller.contagios = async (req, res) => {
    try {
        const data = await services.getData();
        const newData = await services.discriminar(data);
        res.status(200).json({
            "contagios":  newData,
        });
    } catch(err) {
        res.status(400).json({"error": err});
    }
}

controller.filtrar = async (req, res) => {
    try {
        const data = await services.filter(req.body);
        res.status(200).json({
            "ids": data
        });
    } catch(err) {
        res.status(400).json({"error": err});
    }
}

module.exports = controller;