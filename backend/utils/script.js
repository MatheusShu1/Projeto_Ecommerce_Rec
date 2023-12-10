const Produto = require('../models/product');
const User = require('../models/user');

const dotenv = require('dotenv');

const connectDatabase = require('../config/database');

const produtos = require('../data/produtos.json');
const admin = require ('../data/userAdmin.json');
// Setting dotenv file

dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

const seedProdutos = async () => {
    try {
        await Produto.deleteMany();
        console.log('Produtos deletados');

        await Produto.insertMany(produtos);
        console.log('Todos os produtos foram adicionados');

        process.exit();

    } catch (error) {
        console.error("Erro durante a execução do script:", error);
        process.exit(1); // Encerra o processo com código de erro
    }
}

const createAdmin = async () => {
    try {
        await User.insertMany(admin);
        console.log('Usuário inicial administrador criado.')
    } catch (error) {
        console.error("Erro durante a execução do Insert de usuário inicial:", error);
        process.exit(1); // Encerra o processo com código de erro
    }
}
seedProdutos();
createAdmin();