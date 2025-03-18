const ingressoModel = require("../models/ingressoModel");

const getAllIngressos = async (req, res) => {
    try {
        const ingressos = await ingressoModel.getAllIngressos();
        res.json(ingressos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar Ingressos." });
    }
};

const getIngressoById = async (req, res) => {
    try {
        const { id } = req.params;
        const ingresso = await ingressoModel.getIngressoById(id);
        if (!ingresso) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(ingresso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar Ingresso." });
    }
}

const createIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const newIngresso = await ingressoModel.createIngresso(evento, local, data_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newIngresso);
    } catch (error) {
	console.log(error);
        if (error.code === "23505") { // Código de erro do PostgreSQL para chave única violada
            return res.status(400).json({ message: "Ingresso já cadastrado." });
        }
        res.status(500).json({ message: "Erro ao criar ingresso." });
    }
};

const updateIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const { id } = req.params;
        const updatedIngresso = await ingressoModel.updateIngresso(id, evento, local, data_evento, categoria, preco, quantidade_disponivel);
        if (updatedIngresso.error) {
            return res.status(404).json(updatedIngresso);
        }
        res.json(updatedIngresso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar ingresso." });
    }
}

const deleteIngresso = async (req, res) => {
    try {
        const message = await ingressoModel.deleteIngresso(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar ingresso." });
    }
};

const createVenda = async (req, res) => {
    try {
        const { id, quantidade_requerida } = req.body;
        const newVenda = await ingressoModel.createVenda(id, quantidade_requerida);
        if (newVenda.error) {
            return res.status(400).json({ message: newVenda.error });
        }
        res.status(201).json(newVenda);
    } catch (error) {
        console.log(error);
        if (error.code === "23505") { 
            return res.status(400).json({ message: "Ingresso já comprado." });
        }
            res.status(500).json({ message: "Erro ao comprar ingresso." });
    }
};

module.exports = { getAllIngressos, getIngressoById, createIngresso, deleteIngresso, updateIngresso, createVenda };
