# Controle de Estoque de Farmácia

`CURSO: Sistemas de Informação`

`DISCIPLINA: Projeto - Arquitetura de Sistemas Distribuídos`

`SEMESTRE: 6º`

Sistema desenvolvido para fazer o control de estoque de uma farmácia, possibilitando o gerenciamento, acompanhamento e manipulação dos itens que são cadastrados no banco de dados.

## Integrantes

* Camila Fernanda da Silva
* Francisco dos Santos Lage de Matos
* Gabriela Scarabelli Bahia
* Henrique de Paula Lima
* Nathalia Souto Ferreira Pino
* Wallace Inácio Gomes de Sousa

## Orientador

* Kleber Souza

# Planejamento

| Etapa | Atividades |
| ----- | ---------- |
| ETAPA 1 |[Documentação de Contexto](docs/contexto.md) <br> |
| ETAPA 2 |[Planejar, desenvolver e gerenciar APIs e Web Services](docs/backend-apis.md) <br> |
| ETAPA 3 | [Planejar, desenvolver e gerenciar uma aplicação Web](docs/frontend-web.md) |
| ETAPA 4 | [Planejar, desenvolver e gerenciar uma aplicação Móvel](docs/frontend-mobile.md) <br> |
| ETAPA 5 | [Apresentação](presentation/README.md) |

## Instruções de utilização

<!-- Assim que a primeira versão do sistema estiver disponível, deverá complementar com as instruções de utilização. Descreva como instalar eventuais dependências e como executar a aplicação. -->
Instalação:
1. Visual Studio 2022
2. .NET 8 SDK
3. SQL Server
4. SQL Server Management Studio

Utilização:

1. Abrir a solução no Visual Studio 2022 do arquivo `\src\Estoque.Farmacia.API\Estoque.Farmacia.API.sln`.
2. Configurar no arquivo `appsettings.json` o nome do servidor local do SQL Server.
3. Executar as migrações para o banco de dados:
    - `Add-Migration InitialCreate`
    - `Update-Database`
4. Por padrão o Swagger será inicializado na execução da solução para utilizar a API, também é possível o acesso em `https://localhost:7005/swagger`.

# Código

<li><a href="src/README.md"> Código Fonte</a></li>

# Apresentação

<li><a href="presentation/README.md"> Apresentação da solução</a></li>
