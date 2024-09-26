# APIs e Web Services

A API do Controle de Estoque de Medicamentos permite gerenciar e monitorar o inventário de medicamentos de forma eficiente. Com funcionalidades para cadastrar, atualizar, remover e consultar medicamentos, a API facilita o controle de entrada e saída de produtos, além de manter informações detalhadas sobre quantidade disponível, data de validade e lotes.

## Objetivos da API

<!-- O primeiro passo é definir os objetivos da sua API. O que você espera alcançar com ela? Você quer que ela seja usada por clientes externos ou apenas por aplicações internas? Quais são os recursos que a API deve fornecer?

[Inclua os objetivos da sua api.] -->

- Gerenciar Fornecedores: Cadastrar, consultar, atualizar e excluir informações de fornecedores.
- Gerenciar Medicamentos: Cadastrar, consultar, atualizar e excluir informações de medicamentos.
- Controlar Lotes: Criar, consultar, atualizar e excluir lotes de medicamentos, incluindo informações sobre quantidade, data de fabricação e validade.
- Registrar Entradas e Saídas: Registrar a entrada e saída de medicamentos no estoque, associando as operações a lotes específicos.
- Gerenciar Usuários: Criar, autenticar e gerenciar permissões de usuários do sistema.

## Arquitetura

<!-- [Descrição da arquitetura das APIs, incluindo os componentes e suas interações.] -->

A API de Estoque de Farmácia segue a arquitetura em camadas, promovendo a separação de responsabilidades e a organização do código. Abaixo, a descrição dos componentes e suas interações:

**Camadas**

- Controladores (Controllers): Recebem as requisições HTTP, interagem com a camada de serviço para processar a lógica de negócio e retornam as respostas HTTP. São responsáveis por definir as rotas, validar os dados de entrada e formatar os dados de saída.
- Serviços (Services): Implementam a lógica de negócio da aplicação, como regras de validação, cálculos, manipulação de dados e interação com o repositório. Isolam a lógica de negócio dos controladores, tornando o código mais reutilizável e testável.
- Contexto do Banco de Dados (AppDbContext): Representa a sessão com o banco de dados e permite realizar operações de consulta e atualização. É configurado para usar o Entity Framework Core.
- Modelos de Entidade (Models): Classes que representam as tabelas do banco de dados e definem a estrutura dos dados.

**Componentes externos**

- Banco de Dados (SQL Server): Armazena os dados da aplicação, como informações de fornecedores, medicamentos, lotes, entradas, saídas e usuários.

- Cliente HTTP: Qualquer aplicação que consuma a API, enviando requisições e recebendo respostas.

## Modelagem da Aplicação

<!-- [Descreva a modelagem da aplicação, incluindo a estrutura de dados, diagramas de classes ou entidades, e outras representações visuais relevantes.] -->

**Fornecedor:**

| Atributo     | Descrição                          | Tipo de Dado | Chave Primária |
| ------------ | ---------------------------------- | ------------ | -------------- |
| Id           | Identificador único do fornecedor  | int          | Sim            |
| NomeFantasia | Nome fantasia do fornecedor        | string       |                |
| CNPJ         | CNPJ do fornecedor                 | string       |                |
| Telefone     | Telefone de contato do fornecedor  | string       |                |
| Email        | Endereço de e-mail do fornecedor   | string       |                |

**Medicamento:**

| Atributo       | Descrição                          | Tipo de Dado | Chave Primária | Chave Estrangeira |
| -------------- | ---------------------------------- | ------------ | -------------- | ----------------- |
| Id             | Identificador único do medicamento | int          | Sim            |                   |
| NomeComercial  | Nome comercial do medicamento      | string       |                |                   |
| PrecoCusto     | Preço de custo do medicamento      | decimal      |                |                   |
| PrecoVenda     | Preço de venda do medicamento      | decimal      |                |                   |
| FornecedorId   | ID do Fornecedor do medicamento    | int          |                | Sim               |

**Lote:**

| Atributo       | Descrição                          | Tipo de Dado | Chave Primária | Chave Estrangeira |
|----------------|------------------------------------|--------------|----------------|-------------------|
| Id             | Identificador único do lote        | int          | Sim            |                   |
| Quantidade     | Quantidade de medicamentos no lote | int          |                |                   |
| DataFabricacao | Data de fabricação do lote         | DateTime     |                |                   |
| DataValidade   | Data de validade do lote           | DateTime     |                |                   |
| MedicamentoId  | ID do Medicamento do lote          | int          |                | Sim               |

**Entrada:**

| Atributo           | Descrição                          | Tipo de Dado | Chave Primária | Chave Estrangeira |
| ------------------ | ---------------------------------- | ------------ | -------------- | ----------------- |
| Id                 | Identificador único da entrada     | int          | Sim            |                   |
| DataEntrada        | Data e hora da entrada do lote     | DateTime     |                |                   |
| QuantidadeRecebida | Quantidade de medicamento recebido | int          |                |                   |
| LoteId             | ID do Lote da entrada              | int          |                | Sim               |

**Saída:**

| Atributo         | Descrição                          | Tipo de Dado | Chave Primária | Chave Estrangeira |
| ---------------- | ---------------------------------- | ------------ | -------------- | ----------------- |
| Id               | Identificador único da saída       | int          | Sim            |                   |
| DataSaida        | Data e hora da saída do lote       | DateTime     |                |                   |
| QuantidadeSaida  | Quantidade de medicamento vendido  | int          |                |                   |
| LoteId           | ID do Lote da saída                | int          |                | Sim               |

**Usuario:**

| Atributo    | Descrição                     | Tipo de Dado | Chave Primária |
| ----------- | ----------------------------- | ------------ | -------------- |
| Id          | Identificador único usuário   | int          | Sim            |
| NomeUsuario | Nome de usuário para login    | string       |                |
| Senha       | Hash da senha do usuário      | string       |                |

## Fluxo de Dados

<!-- [Diagrama ou descrição do fluxo de dados na aplicação.] -->

1. O Cliente HTTP envia uma requisição HTTP para a API.
2. O Controlador correspondente recebe a requisição e a direciona para o Serviço responsável.
3. O Serviço processa a lógica de negócio e interage com o Repositório (através do AppDbContext) para acessar os dados.
4. O Repositório realiza as operações no Banco de Dados e retorna os dados para o Serviço.
5. O Serviço retorna os dados processados para o Controlador.
6. O Controlador formata os dados e retorna uma resposta HTTP para o Cliente.

## Requisitos Funcionais

| Id  | Descrição do Requisito                                                         | Prioridade |
| --- | ------------------------------------------------------------------------------ | ---------- |
| **RF01** | Gerenciamento de Medicamentos (Cadastrar, Atualizar, Consultar e Remover) | Alta       |
| **RF02** | Gerenciamento de Entradas no Estoque (Registrar, Atualizar, Consultar)   | Alta       |
| **RF03** | Gerenciamento de Saídas do Estoque (Registrar, Atualizar, Consultar)     | Alta       |
| **RF04** | Gerenciamento de Lotes (Cadastrar, Atualizar, Consultar)                 | Alta      |
| **RF05** | Gerenciamento de Fornecedores (Cadastrar, Atualizar, Consultar e Desativar) | Alta   |
| **RF06** | Autenticação de Usuários                                                       | Alta       |

## Requisitos Não Funcionais

| Id   | Descrição do Requisito                                                          | Prioridade |
| ---- | ------------------------------------------------------------------------------- | ---------- |
| **RNF01** | A API deve ser desenvolvida utilizando o framework .NET com linguagem C#         | Alta       |
| **RNF02** | O banco de dados deve ser implementado usando SQL Server                        | Alta       |
| **RNF03** | A API deve seguir os princípios RESTful para padronização de rotas e operações  | Alta       |
| **RNF04** | A API deve suportar autenticação baseada em JWT                         | Alta       |
| **RNF05** | O tempo de resposta da API deve ser inferior a 500 ms    | Média      |
| **RNF06** | A API deve ser documentada utilizando o Swagger    | Alta       |
| **RNF07** | O sistema deve ser compatível com versões recentes dos navegadores (Chrome, Firefox, Edge) | Baixa |
| **RNF08** | A segurança deve ser garantida por meio de criptografia de dados de acesso      | Alta       |
| **RNF09** | A API deve fornecer tratamento de erros intuitivos para identificação do usuário      | Alta       |

## Tecnologias Utilizadas

<!-- Existem muitas tecnologias diferentes que podem ser usadas para desenvolver APIs Web. A tecnologia certa para o seu projeto dependerá dos seus objetivos, dos seus clientes e dos recursos que a API deve fornecer.

[Lista das tecnologias principais que serão utilizadas no projeto.] -->

- Linguagem de Programação: C#.
- Framework Web: ASP.NET Core.
- ORM: Entity Framework Core.
- Banco de Dados: SQL Server.
- Autenticação: JSON Web Token (JWT).

## API Endpoints

<!-- [Liste os principais endpoints da API, incluindo as operações disponíveis, os parâmetros esperados e as respostas retornadas.] -->

**Fornecedores:**

| Endpoint                   | Método HTTP | Descrição                           | Parâmetros     | Respostas                                         |
| -------------------------- | ----------- | ----------------------------------- | -------------- | ------------------------------------------------- |
| /api/fornecedores          | GET         | Retorna lista de fornecedores.      | Nenhum         | 200 (OK) - Lista de objetos Fornecedor            |
| /api/fornecedores/{id}     | GET         | Retorna um fornecedor pelo ID.      | id             | 200 (OK) - Objeto Fornecedor, 404 (NotFound)      |
| /api/fornecedores          | POST        | Cria um novo fornecedor.            | Corpo JSON     | 201 (Created) - Objeto Fornecedor criado          |
| /api/fornecedores/{id}     | PUT         | Atualiza um fornecedor pelo ID.     | id, Corpo JSON | 204 (NoContent), 400 (BadRequest), 404 (NotFound) |
| /api/fornecedores/{id}     | DELETE      | Exclui um fornecedor pelo ID.       | id             | 204 (NoContent), 404 (NotFound)                   |

**Medicamentos:**

| Endpoint                   | Método HTTP | Descrição                           | Parâmetros     | Respostas                                         |
| -------------------------- | ----------- | ----------------------------------- | -------------- | ------------------------------------------------- |
| /api/medicamentos          | GET         | Retorna lista de medicamentos.      | Nenhum         | 200 (OK) - Lista de objetos Medicamento           |
| /api/medicamentos/{id}     | GET         | Retorna um medicamento pelo ID.     | id             | 200 (OK) - Objeto Medicamento, 404 (NotFound)     |
| /api/medicamentos          | POST        | Cria um novo medicamento.           | Corpo JSON     | 201 (Created) - Objeto Medicamento criado         |
| /api/medicamentos/{id}     | PUT         | Atualiza um medicamento pelo ID.    | id, Corpo JSON | 204 (NoContent), 400 (BadRequest), 404 (NotFound) |
| /api/medicamentos/{id}     | DELETE      | Exclui um medicamento pelo ID.      | id             | 204 (NoContent), 404 (NotFound)                   |

**Lotes:**

| Endpoint               | Método HTTP | Descrição                           | Parâmetros     | Respostas                                         |
| ---------------------- | ----------- | ----------------------------------- | -------------- | ------------------------------------------------- |
| /api/lotes             | GET         | Retorna uma lista de todos os lotes | Nenhum         | 200 (OK) - Lista de objetos Lote                  |
| /api/lotes/{id}        | GET         | Retorna um lote pelo ID.            | id             | 200 (OK) - Objeto Lote, 404 (NotFound)            |
| /api/lotes             | POST        | Cria um novo lote.                  | Corpo JSON     | 201 (Created) - Objeto Lote criado                |
| /api/lotes/{id}        | PUT         | Atualiza um lote pelo ID.           | id, Corpo JSON | 204 (NoContent), 400 (BadRequest), 404 (NotFound) |
| /api/lotes/{id}        | DELETE      | Exclui um lote pelo ID.             | id             | 204 (NoContent), 404 (NotFound)                   |

**Entradas:**

| Endpoint               | Método HTTP | Descrição                               | Parâmetros     | Respostas                                         |
| ---------------------- | ----------- | --------------------------------------- | -------------- | ------------------------------------------------- |
| /api/entradas          | GET         | Retorna uma lista de todas as entradas. | Nenhum         | 200 (OK) - Lista de objetos Entrada               |
| /api/entradas/{id}     | GET         | Retorna uma entrada pelo ID.            | id             | 200 (OK) - Objeto Entrada, 404 (NotFound)         |
| /api/entradas          | POST        | Cria uma nova entrada.                  | Corpo JSON     | 201 (Created) - Objeto Entrada criado             |
| /api/entradas/{id}     | PUT         | Atualiza uma entrada pelo ID.           | id, Corpo JSON | 204 (NoContent), 400 (BadRequest), 404 (NotFound) |
| /api/entradas/{id}     | DELETE      | Exclui uma entrada pelo ID.             | id             | 204 (NoContent), 404 (NotFound)                   |

**Saidas:**

| Endpoint               | Método HTTP | Descrição                             | Parâmetros     | Respostas                                         |
| ---------------------- | ----------- | ------------------------------------- | -------------- | ------------------------------------------------- |
| /api/saidas            | GET         | Retorna uma lista de todas as saídas. | Nenhum         | 200 (OK) - Lista de objetos Saida                 |
| /api/saidas/{id}       | GET         | Retorna uma saída pelo ID.            | id             | 200 (OK) - Objeto Saida, 404 (NotFound)           |
| /api/saidas            | POST        | Cria uma nova saída.                  | Corpo JSON     | 201 (Created) - Objeto Saida criado               |
| /api/saidas/{id}       | PUT         | Atualiza uma saída pelo ID.           | id, Corpo JSON | 204 (NoContent), 400 (BadRequest), 404 (NotFound) |
| /api/saidas/{id}       | DELETE      | Exclui uma saída pelo ID.             | id             | 204 (NoContent), 404 (NotFound)                   |

**Usuários**

| Endpoint                   | Método HTTP | Descrição                                          | Parâmetros   | Respostas                                             |
| -------------------------- | ----------- | -------------------------------------------------- | ------------ | ----------------------------------------------------- |
| /api/usuarios/autenticar   | POST        | Autentica um usuário e gera um token JWT.          | Corpo JSON   | 200 (OK) - Token JWT, 400 (BadRequest)                |
| /api/usuarios              | POST        | Cria um novo usuário.                              | Corpo JSON   | 201 (Created) - Usuário criado, 400 (BadRequest)      |
| /api/usuarios/me           | GET         | Retorna os dados do usuário autenticado.           | Nenhum       | 200 (OK) - Dados do usuário, 401 (Unauthorized)       |
| /api/usuarios/me           | PUT         | Atualiza os dados do usuário autenticado.          | Corpo JSON   | 204 (NoContent), 400 (BadRequest), 401 (Unauthorized) |
| /api/usuarios/me           | DELETE      | Exclui ou desativa a conta do usuário autenticado. | Nenhum       | 204 (NoContent), 401 (Unauthorized)                   |

<!-- ### Endpoint 1
- Método: GET
- URL: /endpoint1
- Parâmetros:
  - param1: [descrição]
- Resposta:
  - Sucesso (200 OK)
    ```
    {
      "message": "Success",
      "data": {
        ...
      }
    }
    ```
  - Erro (4XX, 5XX)
    ```
    {
      "message": "Error",
      "error": {
        ...
      }
    }
    ``` -->

## Considerações de Segurança

[Discuta as considerações de segurança relevantes para a aplicação distribuída, como autenticação, autorização, proteção contra ataques, etc.]

## Implantação

### Preparando ambiente

1. Instalar .NET8.0 (https://dotnet.microsoft.com/en-us/download/dotnet/8.0);
2. Instalar SQL Server 2022 (https://www.microsoft.com/en-us/sql-server/sql-server-downloads);
3. instalar Visual Studio (https://visualstudio.microsoft.com/downloads/);
4. Instalar Git (https://git-scm.com/downloads);
5. Criar Database Engine com SQL Server (https://learn.microsoft.com/en-us/sql/relational-databases/database-engine-tutorials?view=sql-server-ver16).

### Rodando ambiente

1. Clonar repositório do projeto em ambiente local;
```bash
git clone https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia.git
```
2. Abrir solução `src\Estoque.Farmacia.API\Estoque.Farmacia.API.sln`no Visual Studio;
3. Configurar conexão com o banco no `appsettings.json`. Substituir parâmetro "Server" em "DefaultConnection" para o servidor do SQL Server criado anteriormente;
4. Executar migrações para o banco de dados, abrir Console de Gerenciamento de Pacotes (Ferramenteas > Gerenciador de Pacotes NuGet > Console de Gerenciamento de Pacotes) e rodar os comandos:
```bash
Add-Migration InitialCreate
```
```bash
Update-Database
```
5. Rodar o projeto pelo botão iniciar no Visual Studio (Ctrl+F5);
6. Acessar Swagger do projeto em: `https://localhost:7005/swagger`.

## Testes

[Descreva a estratégia de teste, incluindo os tipos de teste a serem realizados (unitários, integração, carga, etc.) e as ferramentas a serem utilizadas.]

1. Crie casos de teste para cobrir todos os requisitos funcionais e não funcionais da aplicação.
2. Implemente testes unitários para testar unidades individuais de código, como funções e classes.
3. Realize testes de integração para verificar a interação correta entre os componentes da aplicação.
4. Execute testes de carga para avaliar o desempenho da aplicação sob carga significativa.
5. Utilize ferramentas de teste adequadas, como frameworks de teste e ferramentas de automação de teste, para agilizar o processo de teste.

# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
