const Product = require('../models/produto');

const dotenv = require('dotenv');

const connectDatabase = require('../config/database');

const produtos = require('../data/produtos');

// Setting dotenv file

dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

const seedProdutos = async () => {
    try {
        await Product.deleteMany();
        console.log('Produtos deletados');

        await Product.insertMany(produtos);
        console.log('Todos os produtos foram adicionados');

        process.exit();

    } catch (error) {
        console.log("algo deu errado");
        process.exit();
    }
}

seedProdutos();