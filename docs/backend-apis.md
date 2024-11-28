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

A API de Estoque de Farmácia segue a arquitetura monilitica, promovendo a integração e a organização do código em um unico processo. Abaixo, a descrição dos componentes e suas interações:

**Módulos**

- Controladores (Controllers): Recebem as requisições HTTP, interagem com a camada de serviço para processar a lógica de negócio e retornam as respostas HTTP. São responsáveis por definir as rotas, validar os dados de entrada e formatar os dados de saída.
- Serviços (Services): Implementam a lógica de negócio da aplicação, como regras de validação, cálculos, manipulação de dados e interação com o repositório. Isolam a lógica de negócio dos controladores, tornando o código mais reutilizável e testável.
- Contexto do Banco de Dados (AppDbContext): Representa a sessão com o banco de dados e permite realizar operações de consulta e atualização. É configurado para usar o Entity Framework Core.
- Modelos de Entidade (Models): Classes que representam as tabelas do banco de dados e definem a estrutura dos dados.

**Componentes externos**

- Banco de Dados (SQL Server): Armazena os dados da aplicação, como informações de fornecedores, medicamentos, lotes, entradas, saídas e usuários.

- Cliente HTTP: Qualquer aplicação que consuma a API, enviando requisições e recebendo respostas.

## Modelagem da Aplicação

<!-- [Descreva a modelagem da aplicação, incluindo a estrutura de dados, diagramas de classes ou entidades, e outras representações visuais relevantes.] -->

![image](https://github.com/user-attachments/assets/929cf36d-5109-41a2-930a-613b2603d6cd)

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
| Fabricante     | Nome do fabricante                 | string       |                |                   |
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
| **RNF07** | A segurança deve ser garantida por meio de criptografia de dados de acesso      | Alta       |
| **RNF08** | A API deve fornecer tratamento de erros intuitivos para identificação do usuário      | Alta       |

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

Para utilizar a API o usuário deve se cadastrar pelo endpoint `/api/Usuarios` e se autenticar pelo endpoint `/api/Usuarios/Autenticar`, que por sua vez irá gerar um token JWT para ser utilizado na autenticação das requisições da API.
Usuários que não possuirem um token de acesso não serão autorizados a fazer requisições no sistema.

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

<p>Foram realizados testes de funcionalidade abrangentes para garantir que todos os requisitos funcionais fossem atendidos.</p>

**Fornecedores**
Nos testes de funcionalidade para o gerenciamento de fornecedores, foram realizados diversos métodos para manipulação de dados, como criação, consulta, atualização e exclusão de fornecedores. Cada fornecedor exige informações específicas como **nome fantasia**, **CNPJ**, **telefone** e **e-mail** para garantir a integridade e o detalhamento dos dados.

### Detalhamento dos Métodos e Resultados Esperados

1. **Método POST**  
   Na criação de um novo fornecedor, foi necessário enviar os dados obrigatórios (nome fantasia, CNPJ, telefone e e-mail). Essa requisição adiciona o novo fornecedor ao banco de dados e, ao final, espera-se uma resposta confirmando a inserção, incluindo um **ID único** atribuído ao fornecedor recém-criado.
   
   ![Figura 1 - Método POST](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Fornecedores/POST.png?raw=true)
   <h6 align="center">Figura 1 - Método POST</h6>

2. **Método GET**  
   O método GET retorna uma lista de todos os fornecedores cadastrados. A resposta inclui as informações principais de cada fornecedor, como ID, nome fantasia, CNPJ, telefone e e-mail, permitindo uma visão completa dos dados registrados.

   ![Figura 2 - Método GET](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Fornecedores/GET1.png?raw=true)
   <h6 align="center">Figura 2 - Método GET</h6>

3. **Método GET by ID**  
   Com o método GET by ID, é possível consultar um fornecedor específico, utilizando seu ID único. Esse método retorna os detalhes completos do fornecedor solicitado, garantindo um acesso direto às informações.

   ![Figura 3 - GET by ID](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Fornecedores/GETID.png?raw=true)
   <h6 align="center">Figura 3 - GET by ID</h6>

4. **Método PUT**  
   O método PUT permite atualizar as informações de um fornecedor existente. Para isso, é necessário enviar o ID do fornecedor e as novas informações, como nome fantasia, CNPJ, telefone ou e-mail. O resultado esperado é uma confirmação da atualização dos dados no sistema.

   ![Figura 4 - Método PUT](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Fornecedores/PUT.png?raw=true)
   <h6 align="center">Figura 4 - Método PUT</h6>

5. **Método DELETE**  
   Por fim, o método DELETE permite excluir um fornecedor do sistema. Após enviar o ID do fornecedor a ser deletado, espera-se uma confirmação de exclusão, removendo o registro permanentemente.

   ![Figura 5 - Método DELETE](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Fornecedores/DELETE.png?raw=true)
   <h6 align="center">Figura 5 - Método DELETE</h6>



**Medicamento**

Nos testes de funcionalidade para o gerenciamento de medicamentos, foram utilizados métodos para criação, consulta, atualização e exclusão de registros. Cada medicamento requer informações específicas, incluindo **nome**, **preço de custo**, **preço de venda** e **fornecedorId** para garantir a correta identificação e controle no sistema.

### Detalhamento dos Métodos e Resultados Esperados

1. **Método POST**  
   No cadastro de um novo medicamento, é necessário fornecer o nome do medicamento, preço de custo, preço de venda e o fornecedorId. Esta requisição insere o medicamento no banco de dados e, ao final, espera-se uma resposta confirmando a criação, incluindo o **ID único** do medicamento cadastrado.

   ![Figura 6 - Método POST](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Medicamento/POST.png?raw=true)
   <h6 align="center">Figura 6 - Método POST</h6>

2. **Método GET**  
   O método GET permite consultar uma lista de todos os medicamentos cadastrados. A resposta exibe informações essenciais de cada medicamento, como ID, nome, preço de custo, preço de venda e fornecedorId, oferecendo uma visão geral dos medicamentos registrados.

   ![Figura 7 - Método GET](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Medicamento/GET1.png?raw=true)
   <h6 align="center">Figura 7 - Método GET</h6>

3. **Método GET by ID**  
   Este método permite a consulta de um medicamento específico pelo seu ID único. A resposta retorna os detalhes completos do medicamento solicitado, garantindo acesso direto às informações de um item específico.

   ![Figura 8 - Método GET by ID](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Medicamento/GETID.png?raw=true)
   <h6 align="center">Figura 8 - Método GET by ID</h6>

4. **Método PUT**  
   O método PUT permite atualizar as informações de um medicamento existente. Para realizar a atualização, é necessário enviar o ID do medicamento e as novas informações, como nome, preço de custo, preço de venda ou fornecedorId. O resultado esperado é uma confirmação da atualização dos dados no sistema.

   ![Figura 9 - Método PUT](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Medicamento/PUT.png?raw=true)
   <h6 align="center">Figura 9 - Método PUT</h6>

5. **Método DELETE**  
  O método DELETE permite excluir um medicamento do sistema. Após enviar o ID do medicamento a ser deletado, espera-se uma confirmação de exclusão, removendo o registro permanentemente da base de dados.

   ![Figura 10 - Método DELETE](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Medicamento/DELETE.png?raw=true)
   <h6 align="center">Figura 10 - Método DELETE</h6>

**Lote**

Nos testes de funcionalidade para o gerenciamento de lotes, cada lote requer informações detalhadas, incluindo **quantidade**, **data de validade**, **data de fabricação** e **medicamentoId**. Esses dados são essenciais para garantir a rastreabilidade completa e o controle eficaz dos produtos no sistema

### Detalhamento dos Métodos e Resultados Esperados

1. **Método POST**  
   No cadastro de um novo lote, é necessário fornecer quantidade, data de validade, data de fabricação e medicamentoId. Esta requisição insere o lote no banco de dados, e o resultado esperado é uma resposta confirmando a criação do lote, incluindo um **ID único** atribuído a ele.

   ![Figura 11 - Método POST](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Lote/POST.png?raw=true)
   <h6 align="center">Figura 11 - Método POST</h6>

2. **Método GET**  
   O método GET lista todos os lotes cadastrados, exibindo informações como ID, quantidade, data de validade, data de fabricação e medicamentoId, fornecendo uma visão geral dos lotes disponíveis.

   ![Figura 12 - Método GET](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Lote/GET1.png?raw=true)
   <h6 align="center">Figura 12 - Método GET</h6>

3. **Método GET by ID**  
   Com o método GET by ID, é possível consultar um lote específico usando seu ID único, obtendo informações detalhadas do lote solicitado.

   ![Figura 13 - GET by ID](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Lote/GETID.png?raw=true)
   <h6 align="center">Figura 13 - GET by ID</h6>

4. **Método PUT**  
   O método PUT permite atualizar as informações de um lote. Para isso, é necessário enviar o ID do lote e as informações atualizadas. O resultado esperado é uma confirmação de que os dados foram atualizados no sistema.

   ![Figura 14 - Método PUT](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Lote/PUT.png?raw=true)
   <h6 align="center">Figura 14 - Método PUT</h6>

5. **Método DELETE**  
   O método DELETE exclui um lote do sistema. Ao enviar o ID do lote para exclusão, espera-se uma confirmação de remoção.

   ![Figura 15 - Método DELETE](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Lote/DELETE.png?raw=true)
   <h6 align="center">Figura 15 - Método DELETE</h6>

### Entrada de Estoque

Nos testes de funcionalidade para o gerenciamento de entrada de estoque, cada registro de entrada exige informações como quantidade, data de entrada e loteId. Esses dados são necessários para vincular corretamente a movimentação de estoque aos lotes correspondentes.

1. **Método POST**  
   Para adicionar uma nova entrada de estoque, é necessário fornecer quantidade, data de entrada e loteId. A resposta esperada confirma a criação da entrada, com um ID único associado.

   ![Figura 16 - Método POST](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/ENTRADA/POST.png?raw=true)
   <h6 align="center">Figura 16 - Método POST</h6>

2. **Método GET**  
   O método GET lista todas as entradas de estoque, fornecendo uma visão geral com informações como ID, quantidade, data de entrada e loteId.

   ![Figura 17 - Método GET](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/ENTRADA/GET1.png?raw=true)
   <h6 align="center">Figura 17 - Método GET</h6>

3. **Método GET by ID**  
   Com o método GET by ID, é possível consultar uma entrada de estoque específica, utilizando seu ID único para acessar os detalhes completos.

   ![Figura 18 - GET by ID](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/ENTRADA/GETID.png?raw=true)
   <h6 align="center">Figura 18 - GET by ID</h6>

4. **Método PUT**  
   O método PUT permite atualizar uma entrada de estoque existente. É necessário enviar o ID da entrada e os dados atualizados, com uma confirmação de que a entrada foi modificada.

   ![Figura 19 - Método PUT](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/ENTRADA/PUT.png?raw=true)
   <h6 align="center">Figura 19 - Método PUT</h6>

5. **Método DELETE**  
   O método DELETE permite excluir uma entrada de estoque ao fornecer o ID correspondente, com a confirmação de remoção.

   ![Figura 20 - Método DELETE](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/ENTRADA/DELETE.png?raw=true)
   <h6 align="center">Figura 20 - Método DELETE</h6>
   

**Saída de Estoque**
Nos testes de funcionalidade para o gerenciamento de saída de estoque, foram verificados os requisitos de informação necessários para cada registro de saída. Esses dados incluem quantidade, data de saída e loteId, garantindo que cada movimentação de estoque esteja corretamente vinculada ao lote correspondente e permitindo um controle preciso do fluxo de produtos.

**Método POST**
No cadastro de uma nova saída de estoque, é necessário fornecer a quantidade, data de saída e loteId. O sistema confirma a criação da saída com um ID único.
   <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/SA%C3%8DDA/POST.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 21- Método Post</h6>

**Método GET**
O método GET lista todas as saídas de estoque, fornecendo uma visão geral de cada registro, incluindo ID, quantidade, data de saída e loteId.
  <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/SA%C3%8DDA/GET1.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 22- Método Get</h6>

**Método GET by ID**
Este método permite consultar uma saída específica usando seu ID, acessando detalhes completos do registro.
  <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/SA%C3%8DDA/GETID.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 23- Método Get by Id</h6>

**Método PUT**
O método PUT atualiza as informações de uma saída de estoque existente. Requer o ID da saída e as novas informações para confirmação da atualização.
  <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/SA%C3%8DDA/PUT.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 24- Método Put</h6>

**Método DELETE**
O método DELETE remove um registro de saída de estoque, mediante o fornecimento do ID do registro, com confirmação de exclusão.
  <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/SA%C3%8DDA/DELETE.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 25- Método Delete</h6>

Nos testes de funcionalidade para o gerenciamento de **saída de estoque**, foram verificados os requisitos de informação necessários para cada registro de saída. Esses dados incluem **quantidade**, **data de saída** e **loteId**, garantindo que cada movimentação de estoque esteja corretamente vinculada ao lote correspondente e permitindo um controle preciso do fluxo de produtos.

### Usuários

Nos testes de funcionalidade para **autenticação e gerenciamento de usuários**, foi necessário fornecer informações como **nome de usuário** e **senha** para acessar e manipular dados de cada usuário no sistema.

1. **Método POST**  
   Para o cadastro de um novo usuário, é necessário inserir o nome de usuário e a senha. O sistema responde com a confirmação de criação e o ID do novo usuário.

   ![Figura 26 - Método POST](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/USUARIO/POST.png?raw=true)
   <h6 align="center">Figura 26 - Método POST</h6>

2. **Autenticação**  
   No processo de autenticação, o usuário fornece nome e senha. O sistema verifica as credenciais e, em caso de sucesso, concede acesso ao usuário.

   ![Figura 27 - Autenticação](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/USUARIO/AUTENT1.jpg?raw=true)
   <h6 align="center">Figura 27 - Autenticação</h6>

3. **Método GET**  
   O método GET permite visualizar uma lista de todos os usuários cadastrados, mostrando ID e nome de usuário.

   ![Figura 28 - Método GET](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/USUARIO/GET1.png?raw=true)
   <h6 align="center">Figura 28 - Método GET</h6>

4. **Método GET by ID**  
   Este método permite consultar um usuário específico pelo ID, fornecendo detalhes completos do registro.

   ![Figura 29 - GET by ID](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/USUARIO/GETID.png?raw=true)
   <h6 align="center">Figura 29 - Método GET by ID</h6>

5. **Método PUT**  
   O método PUT permite atualizar informações do usuário, exigindo o ID e os dados novos. O sistema confirma a atualização.

   ![Figura 30 - Método PUT](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/USUARIO/PUT.png?raw=true)
   <h6 align="center">Figura 30 - Método PUT</h6>

6. **Método DELETE**  
   Para excluir um usuário, o método DELETE requer o ID do registro e confirma a exclusão.

   ![Figura 31 - Método DELETE](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/USUARIO/DELETE.png?raw=true)
   <h6 align="center">Figura 31 - Método DELETE</h6>

---

### Conclusão

Após a execução dos testes de funcionalidade, verificou-se que todos os cenários, incluindo o gerenciamento de fornecedores, medicamentos, lotes, entradas e saídas de estoque, além da autenticação de usuários, foram concluídos com sucesso. Todos os requisitos funcionais foram atendidos sem a ocorrência de erros ou falhas nos testes, assegurando a robustez do sistema.

# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
