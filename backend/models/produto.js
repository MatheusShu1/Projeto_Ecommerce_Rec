const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor, insira o nome do produto'],
        trim: true,
        maxLength: [100, 'O nome do produto não pode exceder 100 caracteres']
    },
    price: {
        type: Number,
        required: [true, 'Por favor, insira o preço do produto'],
        maxLength: [5, 'O nome do produto não pode exceder 5 caracteres'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Por favor, insira a descrição do produto'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
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
    category: {
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
    seller: {
        type: String,
        required: [true, 'Por favor, insira o vendedor do produto']
    },
    stock: {
        type: Number,
        required: [true, 'Por favor, insira o estoque do produto'],
        maxLength: [5, 'O estoque do produto não pode exceder 5 caracteres'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true

            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true

    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Produtos', produtoSchema);