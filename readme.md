## Economic App

Api para uma aplicação de gerenciamento de gastos.

- Arquitetura em camadas
- Ports and Adapters
- Injeção de dependências
- Testes
- CI/CD

## Features

- [x] criar uma conta - fazer o registro de forma padrão com email e senha
- [x] criar um gasto - registrar um gasto
- [x] desativar uma conta
- [x] deletar um gasto
- [x] buscar gastos - buscar todos os gastos de um usuário
- [x] atualizar conta - atualizar dados da conta, exceto a senha
- [x] atualizar gasto - atualizar dados de um gasto
- [x] gerar relatório de gastos - gerar relatório de gastos para um intervalo de tempo
- [ ] cadastro com o GitHub - cadastro com o github

## Stack

- Node
- TypeScript
- Postgres
- Docker

## Como usar

1. Clone o repositório
2. Instale as dependências

```bash
npm install
```

3. Inicie o container Docker com o banco de dados

```bash
docker-compose up -d
```

4. Crie o arqui de env. Para ambiente de desenvolvimento o arquivo deve ser o ".env.dev"

5. Inicie a aplicação com

```bash
npm run dev
```

Obs: é nescessario utilizar o Node 22.X >

## Como atualizar/modificar

Para realizar alterações no banco de dados, é preciso fazer as alterações no arquivo "schema.prisma".
Após isso, criar a migration com o comando

```bash
npm run migrate:dev
```

E aplicar a migration no banco de dadosc com o seguinte comando

```bash
npm run migrate:apply
```

Obs: Também é possível utilziar o prisma studio utilizando o comando

```bash
npm run prismastudio:dev
```

#### Os comandos foram criados de forma personalizada para poder pegar as variavéis de ambiente do arquivo ".env.dev"
