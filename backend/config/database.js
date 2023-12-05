const mongoose = require('mongoose');

const connectDatabase = async () => {
    console.log('URI do banco de dados:', process.env.DB_LOCAL_URI);

    try {
        await mongoose.connect(process.env.DB_LOCAL_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('Conexão com o banco de dados bem-sucedida');
    } catch (error) {
        console.error(`Erro na conexão com o banco de dados: ${error.message}`);
    }
};


module.exports = connectDatabase;