CREATE DATABASE farmacia_hospital; 
USE farmacia_hospital;

CREATE TABLE Produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT
);

CREATE TABLE Lotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    lote VARCHAR(50) NOT NULL,
    validade DATE NOT NULL,
    quantidade INT NOT NULL,
    CONSTRAINT fk_produto FOREIGN KEY (produto_id) REFERENCES Produtos(id)
);

CREATE TABLE Transacao(
    id INT AUTO_INCREMENT PRIMARY KEY,
    lote_id INT NOT NULL,
    tipo ENUM('entrada', 'retirada') NOT NULL,
    quantidade INT NOT NULL,
    data_transacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_lote FOREIGN KEY (lote_id) REFERENCES Lotes(id)
);
