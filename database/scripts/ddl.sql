CREATE TABLE IF NOT EXISTS Usuario (
    id_usuario int AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(40),
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(40) NOT NULL,
    endereco VARCHAR(60),
    telefone VARCHAR(20),
    data_nasc DATE
);

CREATE TABLE IF NOT EXISTS Amizade (
    id_amizade int AUTO_INCREMENT PRIMARY KEY,
    data_inicio_amizade DATE NOT NULL,
    id_usuario_1 int NOT NULL,
    id_usuario_2 int NOT NULL,
    FOREIGN KEY (id_usuario_1) REFERENCES Usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario_2) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Viagem (
    id_viagem int AUTO_INCREMENT PRIMARY KEY,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    cidade VARCHAR(40) NOT NULL,
    pais VARCHAR(40),
    descricao VARCHAR(150),
    nome VARCHAR(40),
    id_usuario int NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Item (
    id_item int AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS Viagem_Item (
    id_viagem int NOT NULL,
    id_item int NOT NULL,
    quantidade int NOT NULL,
    PRIMARY KEY (id_viagem, id_item),
    FOREIGN KEY (id_viagem) REFERENCES Viagem(id_viagem),
    FOREIGN KEY (id_item) REFERENCES Item(id_item)
);

CREATE TABLE IF NOT EXISTS Midia (
    id_midia int AUTO_INCREMENT PRIMARY KEY,
    arquivo VARCHAR(255) NOT NULL,
    descricao VARCHAR(150),
    id_viagem int NOT NULL,
    FOREIGN KEY (id_viagem) REFERENCES Viagem(id_viagem) 
);

CREATE TABLE IF NOT EXISTS Categoria (
    id_categoria int AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(40) NOT NULL,
    descricao VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Ponto_Turistico (
    id_ponto int AUTO_INCREMENT PRIMARY KEY,
    localizacao VARCHAR(100) NOT NULL,
    nome VARCHAR(40) NOT NULL,
    id_categoria int NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria)
);

CREATE TABLE IF NOT EXISTS Parada (
    id_viagem int NOT NULL,
    id_ponto int NOT NULL,
    custo float,
    nota float,
    PRIMARY KEY (id_viagem, id_ponto),
    FOREIGN KEY (id_viagem) REFERENCES Viagem(id_viagem) ON DELETE CASCADE, 
    FOREIGN KEY (id_ponto) REFERENCES Ponto_Turistico(id_ponto)
);

CREATE TABLE IF NOT EXISTS Review (
    id_review int AUTO_INCREMENT PRIMARY KEY,
    nota float NOT NULL,
    descricao VARCHAR(150),
    id_viagem int NOT NULL,
    id_usuario int NOT NULL,
    FOREIGN KEY (id_viagem) REFERENCES Viagem(id_viagem) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);
