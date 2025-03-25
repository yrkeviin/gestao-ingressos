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
        if (error.code === "23505") {
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

const vendaIngresso = async (req, res) => {
    try {
        const { id, quantidade, preco } = req.body;

        if (preco === undefined || preco === null) {
            return res.status(400).json({ erro: "Preço é obrigatório." });
        }

        if (quantidade <= 0) {
            return res.status(400).json({ erro: "A quantidade deve ser maior que zero." });
        }

        const ingresso = await ingressoModel.getIngressoById(id);
        if (!ingresso) {
            return res.status(404).json({ erro: "Ingresso não encontrado." });
        }

        if (ingresso.quantidade_disponivel === 0) {
            return res.status(400).json({ erro: "Ingressos esgotados." });
        }

        if (quantidade > ingresso.quantidade_disponivel) {
            return res.status(400).json({ erro: "Ingressos insuficientes para a venda." });
        }

        const minPrecos = {
            Pista: 100,
            "Pista VIP": 200,
            Camarote: 300,
            Arquibancada: 80,
        };

        if (preco < minPrecos[ingresso.categoria]) {
            return res.status(400).json({
                erro: `Preço mínimo para a categoria ${ingresso.categoria} é R$${minPrecos[ingresso.categoria]},00.`,
            });
        }

        const novaQuantidade = ingresso.quantidade_disponivel - quantidade;
        await ingressoModel.updateQuantidade(id, novaQuantidade);

        const precoTotal = (preco * quantidade).toFixed(2);
        const precoUnitario = preco.toFixed(2);

        res.json({
            mensagem: "Compra realizada com sucesso!",
            evento: ingresso.evento,
            categoria: ingresso.categoria,
            preco_unitario: precoUnitario,
            quantidade_comprada: quantidade,
            preco_total: precoTotal,
            quantidade_restante: novaQuantidade
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao processar a venda." });
    }
};

module.exports = { getAllIngressos, getIngressoById, createIngresso, deleteIngresso, updateIngresso, vendaIngresso };
