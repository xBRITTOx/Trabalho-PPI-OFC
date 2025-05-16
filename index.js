import express from "express";

const app = express();
const host = "0.0.0.0";
const port = 3000;

app.use(express.urlencoded({ extended: true }));

const cadastros = [];

const style = `
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 30px;
            background-color: #ccffcc; /* fundo verde claro */
        }

        h1 {
            text-align: center;
        }

        form {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            max-width: 600px;
            margin: auto;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        label {
            display: block;
            margin-top: 15px;
        }

        input, button {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }

        button {
            background-color: #4CAF50;
            color: white;
            font-weight: bold;
            cursor: pointer;
            margin-top: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
            background: #fff;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        .container {
            max-width: 1000px;
            margin: auto;
        }

        a {
            display: block;
            text-align: center;
            margin-top: 20px;
            color: #007BFF;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
`;

app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Início</title>
    ${style}
</head>
<body>
    <h1>Bem-vindo à Página Inicial</h1>

    <h1 id="formulario">Formulário de Cadastro</h1>
    <form method="POST" action="/submit">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required>

        <label for="empresa">Empresa:</label>
        <input type="text" id="empresa" name="empresa" required>

        <label for="cnpj">CNPJ:</label>
        <input type="text" id="cnpj" name="cnpj" required>

        <label for="rua">Rua:</label>
        <input type="text" id="rua" name="rua" required>

        <label for="numero">Número:</label>
        <input type="text" id="numero" name="numero" required>

        <label for="bairro">Bairro:</label>
        <input type="text" id="bairro" name="bairro" required>

        <label for="cidade">Cidade:</label>
        <input type="text" id="cidade" name="cidade" required>

        <label for="estado">Estado:</label>
        <input type="text" id="estado" name="estado" required>

        <label for="cep">CEP:</label>
        <input type="text" id="cep" name="cep" required>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>

        <button type="submit">Enviar</button>
    </form>

    <form method="GET" action="/cadastros" style="text-align: center; margin-top: 30px;">
        <button type="submit">Ver Cadastros</button>
    </form>
</body>
</html>`);
});

app.post("/submit", (req, res) => {
    const {
        nome = "",
        empresa = "",
        cnpj = "",
        rua = "",
        numero = "",
        bairro = "",
        cidade = "",
        estado = "",
        cep = "",
        email = "",
    } = req.body;

    cadastros.push({ nome, empresa, cnpj, rua, numero, bairro, cidade, estado, cep, email });

    res.redirect("/cadastros");
});

app.get("/cadastros", (req, res) => {
    let tabela = `
    <div class="container">
        <h1>Cadastros Recebidos</h1>
        <table>
            <tr>
                <th>Nome</th>
                <th>Empresa</th>
                <th>CNPJ</th>
                <th>Rua</th>
                <th>Número</th>
                <th>Bairro</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>CEP</th>
                <th>Email</th>
            </tr>`;

    for (const pessoa of cadastros) {
        tabela += `
            <tr>
                <td>${pessoa.nome || ""}</td>
                <td>${pessoa.empresa || ""}</td>
                <td>${pessoa.cnpj || ""}</td>
                <td>${pessoa.rua || ""}</td>
                <td>${pessoa.numero || ""}</td>
                <td>${pessoa.bairro || ""}</td>
                <td>${pessoa.cidade || ""}</td>
                <td>${pessoa.estado || ""}</td>
                <td>${pessoa.cep || ""}</td>
                <td>${pessoa.email || ""}</td>
            </tr>`;
    }

    tabela += `
        </table>
        <a href="/">Voltar para o formulário</a>
    </div>`;

    res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Cadastros</title>
    ${style}
</head>
<body>
    ${tabela}
</body>
</html>`);
});

app.listen(port, host, () => {
    console.log(`Servidor em execução em http://${host}:${port}/`);
});