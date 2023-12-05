const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });

const connectDatabase = require('./config/database');
//conexão com o banco de dados
connectDatabase();

//configuração do dotenv

const app = require('./app');



app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT:${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
}); 