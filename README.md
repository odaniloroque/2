<h1 align="center"> Passo a Passo </h1>

Para desenvolver uma API NodeJS com as ferramentas mencionadas, siga os seguintes passos:

1. Instale as dependências necessárias: npm install express dotenv morgan nodemon knex pg cors

2. Crie um arquivo .env para armazenar as variáveis de ambiente, como por exemplo a conexão com o banco de dados:

```
makefile

DB_HOST=localhost
DB_PORT=5432
DB_NAME=mydatabase
DB_USER=myusername
DB_PASSWORD=mypassword
```

3. Crie um arquivo knexfile.js para configurar a conexão com o banco de dados:
javascript

```
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      directory: './src/database/migrations',
      tableName: 'knex_migrations'
    }
  }
};
```

4. Crie um diretório src e dentro dele crie um arquivo app.js para configurar o servidor da API:
javascript

```
const express = require('express');
const morgan = require('morgan');
const app = express();

// middlewares
app.use(express.json());
app.use(morgan('tiny'));

// routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
```

5. Crie um diretório src/database e dentro dele crie um arquivo connection.js para gerenciar a conexão com o banco de dados utilizando o Knex:
javascript

```
const knex = require('knex');
const knexfile = require('../../knexfile');

const connection = knex(knexfile.development);

module.exports = connection;
```

6. Execute as migrações do banco de dados com o comando 'npx knex migrate:latest.'

7. No arquivo app.js, importe as rotas da sua API e defina o caminho da rota:

```
const express = require('express');
const morgan = require('morgan');
const app = express();
const routes = require('./routes');

// middlewares
app.use(express.json());
app.use(morgan('tiny'));

// routes
app.use('/api', routes);

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
```

8. Crie um diretório src/routes e dentro dele crie um arquivo index.js para definir as rotas da API:

```
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is running!');
});

module.exports = router;
```

9. No arquivo package.json, adicione os scripts de start e de desenvolvimento:

```
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

10. Segue abaixo o código atualizado para src/index.js com as configurações que foram definidas:

```
const express = require('express');
const app = express();
const env = require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');

// Configuração do Morgan para log de requisições
app.use(morgan('dev'));

// Configuração do Cors para permitir acesso de outras origens
app.use(cors());

// Configuração do Express para reconhecer requisições em JSON
app.use(express.json());

// Configuração das rotas da API
app.use('/api', routes);

// Configuração da porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;

// Inicialização do servidor da API
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Este arquivo importa as configurações definidas no arquivo .env através do pacote dotenv. Em seguida, ele utiliza o pacote morgan para fazer o log das requisições recebidas pela API e o pacote cors para permitir acesso de outras origens. O express.json() é utilizado para permitir que o servidor entenda requisições em formato JSON. Em seguida, o arquivo routes.js é importado e as rotas da API são configuradas com o prefixo /api. Por fim, o servidor é iniciado na porta definida pelo arquivo .env ou na porta 3000 caso não esteja definida.


10. 
Inicie o servidor da API com o comando npm run dev.

Agora que a API está pronta, podemos continuar implementando as funcionalidades desejadas. Vamos supor que queremos criar uma rota para cadastrar usuários e armazenar os dados no banco de dados.

Crie uma nova migração com o comando npx knex migrate:make create_users e defina as colunas que a tabela de usuários deve ter:

```
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
```

12. Execute as migrações do banco de dados com o comando npx knex migrate:latest.

13. Crie um diretório src/controllers e dentro dele crie um arquivo UserController.js para definir as ações que podem ser realizadas com os usuários:

```
const connection = require('../database/connection');

module.exports = {
  async create(req, res) {
    const { name, email, password } = req.body;

    const [user] = await connection('users')
      .insert({ name, email, password })
      .returning('*');

    return res.json(user);
  }
};
```

14. No arquivo src/routes/index.js, importe o UserController e defina a rota para cadastrar usuários:

```
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/users', UserController.create);

module.exports = router;
```


Com esses passos, temos uma rota /api/users que pode ser utilizada para cadastrar usuários na tabela users do banco de dados. É importante lembrar de fazer as validações necessárias nos dados recebidos na requisição antes de inseri-los no banco de dados.



<h1 align="center"> Teste </h1>


Você pode fazer isso utilizando alguma ferramenta para testes de APIs, como o Postman ou o Insomnia, ou utilizando uma biblioteca HTTP no seu código JavaScript.

Segue abaixo um exemplo de como fazer essa requisição utilizando a biblioteca axios:


const axios = require('axios');

const data = {
  name: 'Danilo Roque',
  email: 'dsr.proj3ct@gmail.com',
  password: '123456'
};

axios.post('http://localhost:3000/api/users', data)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error.response.data);
  });

Este código faz uma requisição POST para http://localhost:3000/api/users, enviando um objeto com as informações do novo usuário no corpo da requisição. Se a operação for bem-sucedida, o servidor retornará um objeto JSON com os dados do usuário criado. Caso ocorra algum erro, o servidor retornará um objeto JSON com uma mensagem de erro.

É importante lembrar que, para usar esse código, você precisa ter o servidor da API rodando em sua máquina, na porta 3000. Se estiver usando uma porta diferente, altere a URL da requisição para corresponder à porta em que o servidor está rodando.