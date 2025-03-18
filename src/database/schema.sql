CREATE DATABASE festa_db;

CREATE TABLE ingressos (
    id SERIAL PRIMARY KEY,
    evento VARCHAR(255) NOT NULL,
    local VARCHAR(255) NOT NULL,
    data_evento DATE NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade_disponivel INTEGER NOT NULL
);

INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES 
    ('Show MC Negao Original', 'Vitrine', '20-04-2025', 'Pista', 100, 34),
    ('Show MC Negao Original', 'Vitrine', '20-04-2025', 'Pista VIP', 200, 76),
    ('Show MC Negao Original', 'Vitrine', '20-04-2025', 'Camarote', 300, 124),
    ('Show MC Negao Original', 'Vitrine', '20-04-2025', 'Arquibancada', 80, 5),
    ('Show MC Tuto', 'Woods', '24-04-2025', 'Pista', 100, 41),
    ('Show MC Tuto', 'Woods', '24-04-2025', 'Pista VIP', 100, 42),
    ('Show MC Tuto', 'Woods', '24-04-2025', 'Camarote', 100, 0),
    ('Show MC Tuto', 'Woods', '24-04-2025', 'Arquibancada', 100, 0);
