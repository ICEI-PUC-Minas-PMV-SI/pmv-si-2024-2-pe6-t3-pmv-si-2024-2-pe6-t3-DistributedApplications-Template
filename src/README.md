# Instruções de utilização

## Instalação do Site

O site em HTML/CSS/JS é um projeto estático, logo pode ser utilizado tanto em servidores...

## Histórico de versões

### [0.1.0] - DD/MM/AAAA
#### Adicionado
- Adicionado ...

# Referência

- GestaoMedicamentos.Web (Interface Web):
  - Responsável por fornecer a interface do usuário, desenvolvida com React.
  - Consome a API Gateway para realizar operações CRUD de medicamentos e visualizar relatórios.

- GestaoMedicamentos.API (API Gateway):
  - Ponto de entrada único para todas as requisições da interface web.
  - Roteia as requisições para o microsserviço apropriado.
  - Implementa autenticação e autorização.

- GestaoMedicamentos.Produto (Microsserviço):
  - Gerencia as operações relacionadas aos medicamentos (CRUD).
  - Interage com o banco de dados para persistir os dados.
  - Publica eventos no RabbitMQ após operações de atualização no banco de dados.

- GestaoMedicamentos.Relatorios (Microsserviço):
  - Responsável por gerar e disponibilizar relatórios de estoque.
  - Consome mensagens do RabbitMQ para atualizar os relatórios em background.