Local host sem docker.

Para iniciar, primeiro deve-se baixar o mongodb para conexão com o banco.

Criar conexão no mongo com a URI: mongodb://localhost:27017/ecommerce

Adicionar a váriavel Path as váriaveis de ambiente. 

Executar o comando "npm install" apenas na pasta raiz, para instalar as dependencias.

Após isso execute no console "npm run seeders" > isso limpa e gera os produtos no banco.

Executar "npm run dev" > inicia o servidor em produção e conecta no banco.

<!---- Iniciando o  front end conectado ao banco e backend -->

Acesse a pasta do projeto "cd frontend" e execute o comando "npm install --force" para baixar as dependencias usadas, alguns frameworks são depreceates ou versões anteriores as mais atuais e necessitam do --force para baixar.

Após instalar as dependencias verifique se foi criado a pasta Node_Modules. Se foi criada execute o comando > "npm start" assim o o frontend será executado.

Clique em Login, e crie um usuario para acessar as funcionalidades.

Para testar como administrador, vai ser preciso acessar um usuário pré definido no login.

Dessa forma o usuário é Email: admin@gmail.com
senha: admin@admin.