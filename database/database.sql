CREATE DATABASE MENIN_BD
GO
USE MENIN_BD
GO

CREATE TABLE CLIENTES (
	CLI_ID INTEGER NOT NULL IDENTITY(1,1) PRIMARY KEY,
	CLI_NOME VARCHAR(45) NOT NULL,
	CLI_SOBRENOME VARCHAR(45) NOT NULL,
	CLI_CPF VARCHAR(13) NOT NULL UNIQUE,
	CLI_CELULAR VARCHAR(13) NOT NULL,
	CLI_TELEFONE VARCHAR(13)
);
GO
CREATE TABLE PRODUTOS (
	PROD_ID INTEGER NOT NULL IDENTITY(1,1) PRIMARY KEY,
	PROD_NOME VARCHAR(45) NOT NULL,
	PROD_PRECO DECIMAL(10, 3) NOT NULL
);
GO
CREATE TABLE DESCONTOS (
	DESC_ID INTEGER NOT NULL IDENTITY(1,1) PRIMARY KEY,
	DESC_DATA_INICIAL DATETIME NOT NULL,
	DESC_DATA_FINAL DATETIME NOT NULL,
	DESC_ID_PROD INTEGER NOT NULL,
	DESC_PERCENTUAL INTEGER DEFAULT 0 NOT NULL,
	DESC_DATA_CRIACAO DATETIME DEFAULT GETDATE() NOT NULL, 
	DESC_SITUACAO AS (CASE WHEN (DESC_DATA_CRIACAO >= DESC_DATA_INICIAL AND DESC_DATA_CRIACAO <= DESC_DATA_FINAL) THEN 'A' ELSE 'I' END) PERSISTED
);
GO
ALTER TABLE DESCONTOS ADD CONSTRAINT FK_DESC_REF_PRODUTO FOREIGN KEY (DESC_ID_PROD) REFERENCES PRODUTOS(PROD_ID);
GO
CREATE TABLE COMPRAS (
	COM_ID INTEGER NOT NULL IDENTITY(1,1) PRIMARY KEY,
	COM_ID_CLIENTE INTEGER NOT NULL,
	COM_DATA DATETIME DEFAULT GETDATE() NOT NULL,
	COM_PRECO_TOTAL DECIMAL(10,3) DEFAULT 0 NOT NULL
);
GO
ALTER TABLE COMPRAS ADD CONSTRAINT FK_COMP_REF_CLIENTE FOREIGN KEY (COM_ID_CLIENTE) REFERENCES CLIENTES(CLI_ID);
GO
CREATE TABLE ITENS_COMPRA (
	ITEC_ID INTEGER NOT NULL IDENTITY(1,1) PRIMARY KEY,
	ITEC_ID_COMPRA INTEGER NOT NULL,
	ITEC_ID_PRODUTO INTEGER NOT NULL,
	ITEC_QNTD INTEGER NOT NULL,
	ITEC_ID_DESCONTO INTEGER
);
GO
ALTER TABLE ITENS_COMPRA ADD CONSTRAINT FK_ITEM_REF_COMPRA FOREIGN KEY (ITEC_ID_COMPRA) REFERENCES COMPRAS(COM_ID);
GO
ALTER TABLE ITENS_COMPRA ADD CONSTRAINT FK_ITEM_REF_PRODUTO FOREIGN KEY (ITEC_ID_PRODUTO) REFERENCES PRODUTOS(PROD_ID);
GO
ALTER TABLE ITENS_COMPRA ADD CONSTRAINT FK_ITEM_REF_DESCONTO FOREIGN KEY (ITEC_ID_DESCONTO) REFERENCES DESCONTOS(DESC_ID);
GO
CREATE OR ALTER TRIGGER TG_COMPRA_PRECO_TOTAL
ON ITENS_COMPRA
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    UPDATE COMPRAS SET COM_PRECO_TOTAL = (
    SELECT COALESCE(SUM(IC.ITEC_QNTD * P.PROD_PRECO) - (SUM((IC.ITEC_QNTD * P.PROD_PRECO) * COALESCE(DESC_PERCENTUAL, 0) / 100)),0)
    FROM COMPRAS C 
    INNER JOIN ITENS_COMPRA IC ON IC.ITEC_ID_COMPRA = C.COM_ID
    LEFT JOIN PRODUTOS P ON P.PROD_ID = IC.ITEC_ID_PRODUTO
    LEFT JOIN DESCONTOS ON DESC_ID = ITEC_ID_DESCONTO AND DESC_ID_PROD = ITEC_ID_PRODUTO AND DESC_SITUACAO = 'A'
    WHERE C.COM_ID = COM_ID) WHERE EXISTS (SELECT 1 FROM inserted WHERE inserted.ITEC_ID_COMPRA = COM_ID) OR EXISTS (SELECT 1 FROM deleted WHERE deleted.ITEC_ID_COMPRA = COM_ID)
END
GO
CREATE OR ALTER PROCEDURE ALTERAR_CLIENTES (@OPERACAO VARCHAR(45), @CLI_ID INTEGER,  @CLI_NOME VARCHAR(45), @CLI_SOBRENOME VARCHAR(45), @CLI_CPF VARCHAR(13), @CLI_CELULAR VARCHAR(13), @CLI_TELEFONE VARCHAR(13), @RESPONSE VARCHAR(3) OUTPUT)
AS
	IF (@OPERACAO = 'INSERT')
	BEGIN
		INSERT INTO CLIENTES (CLI_NOME, CLI_SOBRENOME, CLI_CPF, CLI_CELULAR, CLI_TELEFONE) VALUES (@CLI_NOME, @CLI_SOBRENOME, @CLI_CPF, @CLI_CELULAR, @CLI_TELEFONE);
		SET @RESPONSE = '200';
		RETURN
	END
	ELSE IF (@OPERACAO = 'UPDATE' AND @CLI_ID IS NOT NULL)
	BEGIN
		UPDATE CLIENTES SET CLI_NOME = @CLI_NOME, CLI_SOBRENOME = @CLI_SOBRENOME, CLI_CPF = @CLI_CPF, CLI_CELULAR = @CLI_CELULAR, CLI_TELEFONE = @CLI_TELEFONE WHERE CLI_ID = @CLI_ID;
		SET @RESPONSE = '200';
		RETURN
	END
	ELSE IF (@OPERACAO = 'DELETE' AND @CLI_ID IS NOT NULL)
	BEGIN
		DELETE FROM CLIENTES WHERE CLI_ID = @CLI_ID
		SET @RESPONSE = '200';
		RETURN
	END

	SET @RESPONSE = '400';
	RETURN
GO
CREATE OR ALTER PROCEDURE ALTERAR_PRODUTOS (@OPERACAO VARCHAR(45), @PROD_ID INTEGER,  @PROD_NOME VARCHAR(45), @PROD_PRECO DECIMAL(10,3), @RESPONSE VARCHAR(3) OUTPUT)
AS
	IF (@OPERACAO = 'INSERT')
	BEGIN
		INSERT INTO PRODUTOS (PROD_NOME, PROD_PRECO) VALUES (@PROD_NOME, @PROD_PRECO);
		SET @RESPONSE = '200';
		RETURN
	END
	ELSE IF (@OPERACAO = 'UPDATE' AND @PROD_ID IS NOT NULL)
	BEGIN
		UPDATE PRODUTOS SET PROD_NOME = @PROD_NOME, PROD_PRECO = @PROD_PRECO WHERE PROD_ID = @PROD_ID;
		SET @RESPONSE = '200';
		RETURN
	END
	ELSE IF (@OPERACAO = 'DELETE' AND @PROD_ID IS NOT NULL)
	BEGIN
		DELETE FROM PRODUTOS WHERE PROD_ID = @PROD_ID;
		SET @RESPONSE = '200';
		RETURN
	END

	SET @RESPONSE = '400';
	RETURN
GO
CREATE OR ALTER PROCEDURE ALTERAR_DESCONTOS (@OPERACAO VARCHAR(45), @DESC_ID INTEGER, @DESC_DATA_INICIAL DATETIME, @DESC_DATA_FINAL DATETIME, @DESC_ID_PROD INTEGER, @DESC_PERCENTUAL INTEGER, @RESPONSE VARCHAR(3) OUTPUT)
AS
	IF (@OPERACAO = 'INSERT')
	BEGIN
		INSERT INTO DESCONTOS (DESC_DATA_INICIAL, DESC_DATA_FINAL, DESC_ID_PROD, DESC_PERCENTUAL) VALUES (@DESC_DATA_INICIAL, @DESC_DATA_FINAL, @DESC_ID_PROD, @DESC_PERCENTUAL);
		SET @RESPONSE = '200';
		RETURN
	END
	ELSE IF (@OPERACAO = 'UPDATE' AND @DESC_ID IS NOT NULL)
	BEGIN
		UPDATE DESCONTOS SET DESC_DATA_INICIAL = @DESC_DATA_INICIAL, DESC_DATA_FINAL = @DESC_DATA_FINAL, DESC_ID_PROD = @DESC_ID_PROD, DESC_PERCENTUAL = @DESC_PERCENTUAL WHERE DESC_ID = @DESC_ID;
		SET @RESPONSE = '200';
		RETURN
	END
	ELSE IF (@OPERACAO = 'DELETE' AND @DESC_ID IS NOT NULL)
	BEGIN
		DELETE FROM DESCONTOS WHERE DESC_ID = @DESC_ID;
		SET @RESPONSE = '200';
		RETURN
	END

	SET @RESPONSE = '400';
	RETURN
GO
CREATE OR ALTER PROCEDURE REALIZAR_COMPRA (@COM_ID_CLIENTE INTEGER, @RESPONSE VARCHAR(3) OUTPUT)
AS
	INSERT INTO COMPRAS(COM_ID_CLIENTE) VALUES (@COM_ID_CLIENTE);
	SET @RESPONSE = '200';
	RETURN
GO
CREATE OR ALTER PROCEDURE INSERIR_ITENS (@ITEC_ID_COMPRA INTEGER, @ITEC_ID_PRODUTO INTEGER, @ITEC_QNTD INTEGER, @RESPONSE VARCHAR(3) OUTPUT)
AS
	IF (@ITEC_ID_COMPRA IS NULL OR @ITEC_ID_PRODUTO IS NULL OR @ITEC_QNTD IS NULL)
	BEGIN
		SET @RESPONSE = '400';
		RETURN
	END
	INSERT INTO ITENS_COMPRA(ITEC_ID_COMPRA, ITEC_ID_PRODUTO, ITEC_QNTD, ITEC_ID_DESCONTO) VALUES (@ITEC_ID_COMPRA, @ITEC_ID_PRODUTO, @ITEC_QNTD, (SELECT DESC_ID FROM DESCONTOS WHERE DESC_ID_PROD = @ITEC_ID_PRODUTO AND DESC_SITUACAO = 'A'));
	SET @RESPONSE = '200';
	RETURN
GO

-- Inser��o na tabela CLIENTES
INSERT INTO CLIENTES (CLI_NOME, CLI_SOBRENOME, CLI_CPF, CLI_CELULAR, CLI_TELEFONE)
VALUES ('Jo�o', 'Silva', '12345678901', '999999999', '888888888');

-- Inser��o na tabela PRODUTOS
INSERT INTO PRODUTOS (PROD_NOME, PROD_PRECO)
VALUES ('Camiseta', 29.99),
       ('Cal�a', 59.99),
       ('T�nis', 99.99);

-- Inser��o na tabela DESCONTOS
-- Inser��o na tabela DESCONTOS
INSERT INTO DESCONTOS (DESC_DATA_INICIAL, DESC_DATA_FINAL, DESC_ID_PROD, DESC_PERCENTUAL, DESC_DATA_CRIACAO)
VALUES (CONVERT(DATETIME, '2023-06-01', 120), CONVERT(DATETIME, '2023-06-30', 120), 1, 10, GETDATE()),
       (CONVERT(DATETIME, '2023-06-15', 120), CONVERT(DATETIME, '2023-06-30', 120), 2, 20, GETDATE());

-- Inser��o na tabela COMPRAS
INSERT INTO COMPRAS (COM_ID_CLIENTE) VALUES (1);

-- Inser��o na tabela ITENS_COMPRA
INSERT INTO ITENS_COMPRA (ITEC_ID_COMPRA, ITEC_ID_PRODUTO, ITEC_QNTD, ITEC_ID_DESCONTO)
VALUES (1, 1, 2, 1),
       (1, 3, 1, NULL);

DELETE FROM ITENS_COMPRA WHERE ITEC_ID_PRODUTO = 1;
