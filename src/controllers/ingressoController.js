const ingressoModel = require("../models/ingressoModel");

const getAllIngressos = async (req, res) => {
    try {
        const users = await ingressoModel.getIngressos();
        res.json(users);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar igressos." });
    }
};

module.exports = { getAllIngressos };
