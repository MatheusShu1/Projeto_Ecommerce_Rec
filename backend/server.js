const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });

const connectDatabase = require('./config/database');

//tratamento de erros

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Uncaught Exception');
    process.exit(1);
});

//conexão com o banco de dados
connectDatabase();

//configuração do dotenv

const app = require('./app');



const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT:${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
}); 

//tratamento de erros
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1);
    });
});