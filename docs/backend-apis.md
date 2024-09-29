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

![1](https://github.com/user-attachments/assets/eb627fc0-37f0-4a50-9f67-9b422b033376)


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
<p>Nos testes de funcionalidade para o gerenciamento de fornecedores, foi necessário fornecer o nome fantasia, CNPJ, telefone e e-mail.</p>
 
<img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Fornecedores/POST.png?raw=true" margin="auto" display="block" >
<h6 align="center"> Figura 1- Método Post </h6>
 <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Fornecedores/GET1.png?raw=true" margin="auto" display="block">
<h6 align="center"> Figura 2- Método Get</h6>
 <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Fornecedores/GETID.png?raw=true" margin="auto" display="block">
<h6 align="center"> Figura 3- Get by Id</h6>
 <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Fornecedores/PUT.png?raw=true" margin="auto" display="block"  >
<h6 align="center"> Figura 4- Método Put</h6>
 <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Fornecedores/DELETE.png?raw=true" margin="auto" display="block"  >
<h6 align="center"> Figura 5- Método Delete</h6>

**Medicamento**

<p>Nos testes de funcionalidade do gerenciamento de medicamentos, foi necessário fornecer o nome do medicamento, o preço de custo, o preço de venda e o fornecedorId.</p>

  <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Medicamento/POST.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 6- Método Post</h6>
  <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Medicamento/GET1.png?raw=true" margin="auto" display="block"  > 
<h6 align="center">Figura 7- Método Get</h6>

   <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Medicamento/GETID.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 8- Método Get by Id</h6>
  <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Medicamento/PUT.png?raw=true" margin="auto" display="block"  >
 
<h6 align="center">Figura 9- Método Put</h6>

   <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Medicamento/DELETE.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 10- Método Delete</h6>

**Lote**
<p>Nos testes de funcionalidade do gerenciamento de lotes, foi necessário fornecer a quantidade, a data de validade, a data de fabricação e o medicamentoId.</p>

  <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Lote/POST.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 11- Método Post</h6>

   <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Lote/GET1.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 12- Método Get</h6>
  <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Lote/GETID.png?raw=true" margin="auto" display="block"  >
 
<h6 align="center">Figura 13- Get by Id</h6>
   <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Lote/PUT.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 14- Método Put</h6>
   <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/Lote/DELETE.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 15- Método Delete</h6>
  
**Entrada de Estoque**
<p>Nos testes de funcionalidade do gerenciamento de entrada de estoque, foi necessário fornecer a quantidade, a data de entrada e o loteId.</p>
    <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/ENTRADA/POST.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 16- Método Post</h6>
    <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/ENTRADA/GET1.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 17- Método Get</h6>
    <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/ENTRADA/GETID.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 18- Método Get by Id</h6>
   <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/ENTRADA/PUT.png?raw=true" margin="auto" display="block"  > 
<h6 align="center">Figura 19- Método Put</h6>
    <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/ENTRADA/DELETE.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 20- Método Delete</h6>

**Saída de Estoque**
<p>Nos testes de funcionalidade do gerenciamento de saída de estoque, foi necessário fornecer a quantidade, a data de saída e o loteId.</p>
   <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/SA%C3%8DDA/POST.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 21- Método Post</h6>
  <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/SA%C3%8DDA/GET1.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 22- Método Get</h6>
  <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/SA%C3%8DDA/GETID.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 23- Método Get by Id</h6>
  <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/SA%C3%8DDA/PUT.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 24- Método Put</h6>
  <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/SA%C3%8DDA/DELETE.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 25- Método Delete</h6>

**Usuários**
<p>Nos testes de funcionalidade de autenticação de usuário, foi necessário fornecer o nome de usuário e a senha.</p>
  <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/USUARIO/POST.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 26- Método Post</h6>
   <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/USUARIO/AUTENT1.jpg?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 27- Autenticação</h6>
   <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/USUARIO/GET1.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 28- Método Get</h6>
   <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/USUARIO/GETID.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 29- Método Get by Id</h6>
   <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/USUARIO/PUT.png?raw=true" margin="auto" display="block"  >
<h6 align="center">Figura 30- Método Put</h6>
  <img src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g12-controle-de-estoque-de-farmacia/blob/main/docs/img/Screenshots/USUARIO/DELETE.png?raw=true" margin="auto" display="block"  >
 
<h6 align="center">Figura 31- Método Delete</h6>

Após a execução dos testes de funcionalidade, foi verificado que todos os cenários, incluindo o gerenciamento de fornecedores, medicamentos, lotes, entradas e saídas de estoque, bem como a autenticação de usuários, foram concluídos com sucesso. Todos os requisitos funcionais foram atendidos conforme esperado, sem a ocorrência de erros ou falhas nos testes

# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
