const express = require('express');
const app = express();
const env = require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./src/routes');

// Configuração do Morgan para log de requisições
app.use(morgan('dev'));

// Configuração do Cors para permitir acesso de outras origens
app.use(cors());

// Configuração do Express para reconhecer requisições em JSON
app.use(express.json());

// Configuração das rotas da API
app.use('/api', routes);

// Configuração da porta em que o servidor irá escutar
const PORT = process.env.PORT || 3001;

// Inicialização do servidor da API
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
