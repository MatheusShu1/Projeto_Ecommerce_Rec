const mongoose = require('mongoose');

const produtosSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Por favor, insira o nome do produto'],
        trim: true,
        maxLength: [100, 'O nome do produto não pode exceder 100 caracteres']
    },
    preco: {
        type: Number,
        required: [true, 'Por favor, insira o preço do produto'],
        maxLength: [5, 'O nome do produto não pode exceder 5 caracteres'],
        default: 0.0
    },
    descricao: {
        type: String,
        required: [true, 'Por favor, insira a descrição do produto'],
    },
    avaliacao: {
        type: Number,
        default: 0
    },
    imagens: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    categoria: {
        type: String,
        required: [true, 'Por favor, insira a categoria do produto'],
        enum: {
            values: [
                'Mobile',
                'TV',
                'Laptops',
                'cameras',
                'speaker',
                'tablet',
            ],
            message: 'Por favor, selecione uma categoria para o produto'
        }
    },
    vendedor: {
        type: String,
        required: [true, 'Por favor, insira o vendedor do produto']
    },
    estoque: {
        type: Number,
        required: [true, 'Por favor, insira o estoque do produto'],
        maxLength: [5, 'O estoque do produto não pode exceder 5 caracteres'],
        default: 0
    },
    numeroAvaliacoes: {
        type: Number,
        default: 0
    },
    avaliacoes: [
        {
            nome: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comentario: {
                type: String,
                required: true
            }
        }
    ],
    criadoEm: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Produtos', produtosSchema);