Sistema de vendas de bilhetes para rifas

Este projeto consiste em um sistema de vendas de bilhetes para rifas, desenvolvido como parte de um desafio técnico. O objetivo é criar uma plataforma que permita a organização de rifas e a venda de bilhetes para os participantes.

Funcionalidades
Cadastro de rifas, com informações como nome, descrição, data de início e fim, valor dos bilhetes e quantidade total de bilhetes disponíveis.
Geração automática de números de bilhetes para cada rifa cadastrada.
Cadastro de compradores, com informações como nome, e-mail e CPF.
Compra de bilhetes pelos compradores, com validação de disponibilidade de bilhetes e controle de quantidade máxima por compra.
Consulta de compras realizadas por comprador ou por rifa.
Tecnologias utilizadas
Node.js
Express
PostgreSQL
Sequelize
Handlebars
Instalação e execução
Clone este repositório em sua máquina local:
bash
Copy code
git clone https://github.com/seu-usuario/sistema-rifas.git
Acesse a pasta do projeto:
bash
Copy code
cd sistema-rifas
Instale as dependências do projeto:
Copy code
npm install
Configure as variáveis de ambiente para conexão com o banco de dados. Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
makefile
Copy code
DB_HOST=seu_host
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_do_banco_de_dados
Crie as tabelas do banco de dados:
Copy code
npx sequelize-cli db:migrate
Inicie a aplicação:
sql
Copy code
npm start
Acesse a aplicação em seu navegador através do endereço http://localhost:3000.

Contribuindo
Caso queira contribuir para este projeto, por favor siga as instruções abaixo:

Crie um fork deste repositório.
Crie um branch com a sua feature: git checkout -b minha-feature.
Faça as alterações desejadas e faça um commit descrevendo as mudanças: git commit -m "minha feature: novas funcionalidades".
Envie as alterações para o seu repositório remoto: git push origin minha-feature.
Abra um pull request neste repositório para que possamos avaliar suas alterações.
Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.