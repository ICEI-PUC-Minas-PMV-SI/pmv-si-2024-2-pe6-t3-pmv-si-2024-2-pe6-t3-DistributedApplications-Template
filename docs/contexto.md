# Introdução

O desperdício de medicamentos no Brasil representa um desafio significativo para o setor de saúde, impactando tanto as finanças públicas quanto a qualidade do atendimento prestado aos pacientes. O Conselho Federal de Farmácia (CFF) estima que o país perde aproximadamente R$ 1 bilhão anualmente em razão desse desperdício, o que corresponde a cerca de 20% dos medicamentos adquiridos por governos e hospitais privados. Esse cenário é agravado por práticas inadequadas de gestão e controle, como, segundo a matéria publicada pela revista Exame (2013), a incineração de 214 toneladas de medicamentos e insumos no Estado do Rio de Janeiro em 2013 devido à expiração dos produtos. Problemas como a compra de grandes estoques sem controle adequado, armazenamento impróprio e falhas na distribuição contribuem para essa perda significativa.

O descarte inadequado de medicamentos está frequentemente relacionado à expiração das datas de validade e à falta de controle da cadeia de frio. Um exemplo desse problema foi publicado em matéria pelo veículo G1 de noticias, o caso ocorreu em Rondonópolis no ano de 2013, quando vacinas foram rejeitadas devido a falhas no transporte e no controle de temperatura. Essa situação evidencia a necessidade de adoção de melhores práticas e tecnologias, como dataloggers e caixas térmicas, para monitorar e registrar as condições adequadas de transporte e armazenamento. Segundo a pesquisa da Sensorweb de 2013, 6,7% dos hospitais privados no Brasil sofreram perdas significativas de insumos devido a desvios de temperatura, enquanto a Controladoria Geral da União (CGU) identificou, em 2008, que várias cidades incineraram medicamentos vencidos por armazenamento inadequado.

Apesar dos desafios, algumas iniciativas têm mostrado potencial para reduzir o desperdício. Investimentos em sistemas de gestão mais eficientes, como o controle de estoque e monitoramento de temperaturas, não só minimizam perdas financeiras como também melhoram o atendimento aos pacientes. Além disso, segundo matéria da revista o Globo (2010), o desperdício de medicamentos afeta diretamente as famílias de classe média, que enfrentam perdas estimadas em R$ 60,00 por ano com medicamentos vencidos.

Investir em logística hospitalar eficiente e em processos bem estruturados oferece uma oportunidade para melhorar a sustentabilidade financeira das instituições, combater desperdícios e assegurar a segurança e eficácia no tratamento dos pacientes.

## Problema
Parte das perdas de insumos farmacêuticos em setores hospitalares se deve à má gestão de estoques em suas farmácias.

A falta de um recurso de qualidade que atenda as necessidades das instituições hospitalares é um fator crucial para explicar as perdas em insumos farmacêuticos nesta área.

As perdas seriam mitigadas caso um melhor controle dos fármacos disponíveis e necessários à intituição fosse instaurado.

## Objetivos

O objetivo geral destre trabalho é produzir uma aplicação distribuída para auxiliar os profissionais, envolvidos no ramo farmacêutico dentro de hospitais, na gestão de recursos disponíveis em estoque nestas instituições e a consequente redução de perdas de fármacos devido a diversos fatores. 

Pode-se destacar com objetivos específicos a produção de uma aplicação que possa retornar métricas e informações uteis aos farmaceuticos sobre os recursos disponíveis e necessários à instuição.

## Justificativa

A realização deste trabalho é impulsionada pela necessidade crescente de soluções específicas para a gestão de estoques no setor farmacêutico. Diferente de outros segmentos, esse setor lida com produtos que exigem um controle rigoroso, tanto em termos de armazenamento quanto no cumprimento de regulamentações. Medicamentos, por exemplo, muitas vezes precisam ser mantidos sob condições precisas de temperatura, e a rastreabilidade desses itens é essencial para garantir sua qualidade e segurança.

Sistemas de controle de estoque que não são desenvolvidos pensando nas particularidades da área farmaceutica podem deixar a desejar em aspectos críticos, como a manutenção adequada dos medicamentos e o cumprimento das normas de saúde. Isso pode resultar em perdas financeiras, além de comprometer a saúde dos pacientes devido ao uso de produtos mal armazenados ou expirados.

Portanto, o desenvolvimento de um aplicativo de gestão de estoques voltado especificamente para a área dos farmacos se justifica pela necessidade de uma solução que aborde esses desafios de forma integrada. Ao incluir funcionalidades como o monitoramento de temperatura e a gestão de receitas, o aplicativo proposto visa garantir que os profissionais possam operar de maneira segura, eficiente e conforme as exigências legais, respondendo de forma direta às necessidades do mercado.

## Público-Alvo

O aplicativo de gestão de estoques é voltado principalmente para profissionais que lidam com farmacos, sejam estabelecimentos independentes ou grandes redes. Esses profissionais precisam garantir que suas operações sejam eficientes e que estejam em conformidade com as rigorosas regulamentações sanitárias, especialmente no que diz respeito ao armazenamento e controle de medicamentos.

Além disso, o público-alvo inclui farmacêuticos que têm a responsabilidade de supervisionar tecnicamente a farmácia e garantir que todas as normas de saúde e segurança sejam seguidas. Eles necessitam de ferramentas que permitam um gerenciamento preciso e seguro dos estoques.

# Especificações do Projeto

## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que definem o escopo do projeto de controle de estoque de medicamentos para farmácias. Cada requisito foi identificado com um ID único, acompanhado por uma descrição e uma prioridade atribuída.

Para determinar a prioridade dos requisitos, foi utilizada uma abordagem de classificação em três níveis:

**Alta:** Requisitos essenciais que são críticos para o funcionamento do sistema. Devem ser implementados na primeira versão do sistema, pois sua ausência comprometeria a funcionalidade principal.

**Média:** Requisitos importantes, mas que não são críticos para o funcionamento básico do sistema. Embora desejáveis, sua ausência não impede o uso do sistema, mas pode impactar a eficiência ou a experiência do usuário.

**Baixa:** Requisitos desejáveis que agregam valor, mas que podem ser adiados para versões futuras do sistema. Não são essenciais para o funcionamento inicial.

Essa classificação foi aplicada para garantir que os aspectos mais críticos do sistema sejam priorizados no desenvolvimento. As tabelas a seguir organizam os requisitos de acordo com essa priorização.

### Requisitos Funcionais

| ID    | Descrição do Requisito                                                                                                       | Prioridade |
|-------|------------------------------------------------------------------------------------------------------------------------------|------------|
| **RF01** | **Recuperação de Senha:** O sistema deve permitir a recuperação de senha para os usuários cadastrados, enviando um link de redefinição para o email registrado. | **Média**  |
| **RF02** | **Busca e Filtragem de Insumos:** O sistema deve oferecer funcionalidades de busca e filtragem para que os usuários possam encontrar rapidamente informações sobre insumos específicos, facilitando a gestão e a localização de produtos no estoque. | **Baixa**  |
| **RF03** | **Notificação de Validade:** O sistema deve enviar alertas e notificações sobre insumos próximos da data de validade ou vencidos, para que ações corretivas possam ser tomadas antes que os produtos se tornem inutilizáveis. | **Alta**  |
| **RF04** | **Registro de Insumos:** O sistema deve permitir o cadastro de novos insumos farmacêuticos com informações detalhadas, incluindo nome, quantidade, data de validade e fornecedor. | **Alta**  |
| **RF05** | **Controle de Estoque:** O sistema deve permitir o monitoramento e atualização da quantidade de insumos em estoque, com a capacidade de registrar entradas e saídas de produtos de forma precisa e em tempo real. | **Alta**  |
| **RF06** | **Controle de Acesso:** O sistema deve permitir que somente usuários autenticados possam acessar e gerenciar os medicamentos, com diferentes níveis de acesso (administrador, farmacêutico, etc.). | **Alta**   |
| **RF07** | **Histórico de Movimentações:** O sistema deve registrar um histórico de todas as operações realizadas, como criação, atualização e exclusão de medicamentos. | **Baixa**  |
| **RF08** | **Geração de Relatórios:** O sistema deve gerar relatórios de estoque, incluindo medicamentos em falta, com baixa quantidade ou próximos da validade. | **Média**  |




### Requisitos não Funcionais



| ID    | Descrição do Requisito                                                                                                                                                     | Prioridade |
|-------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|
| **RNF01** | **Desempenho:** O sistema deve ser capaz de suportar consultas e atualizações em tempo real, com um tempo de resposta inferior a 2 segundos para operações básicas. | **Alta**       |
| **RNF02** | **Segurança:** O sistema deve garantir a segurança através de criptografia de dados sensíveis e autenticação robusta. | **Alta**       |
| **RNF03** | **Escalabilidade:** O sistema deve ser escalável para suportar um aumento no número de usuários e medicamentos cadastrados, sem perda de desempenho. | **Média**      |
| **RNF04** | **Usabilidade:** A interface deve ser intuitiva e fácil de usar, permitindo que usuários com diferentes níveis de conhecimento tecnológico possam utilizar o sistema sem dificuldades. | **Alta**       |
| **RNF05** | **Compatibilidade:** O sistema deve ser compatível com os principais navegadores web (Chrome, Firefox, Edge, Safari) e dispositivos móveis (Android, iOS). | **Alta**       |
| **RNF06** | **Disponibilidade:** O sistema deve estar disponível para uso 24/7, com um tempo de inatividade planejado não superior a 1 hora por mês para manutenção. | **Alta**       |
| **RNF07** | **Manutenibilidade:** O sistema deve ser projetado para facilitar a manutenção e a atualização, com código limpo e documentação adequada. | **Alta**      |
| **RNF08** | **Backup:** O sistema deve realizar backups automáticos dos dados ao menos uma vez por dia, garantindo a recuperação em caso de falha. | **Alta**       |
| **RNF09** | **Tempo de Recuperação:** Em caso de falha, o sistema deve ser capaz de restaurar o serviço em até 1 hora. | **Alta**      |




Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Deverá ser desenvolvido uma aplicação web       |
|03| Deverá ser desenvolvida uma aplicação mobile       |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

# Catálogo de Serviços

|ID|Serviço|Descição|
|--|-------|--------|
|01|Controle de usuários|Capacidade de cadastrar e autenticar usuários permitindo o acesso a página web, além de permitir a edição de informações do usuário cadastrado.|
|02|Gerenciamento de medicamentos|Capacidade de manipular o cadastro, edição e exclusão de medicamentos (CRUD). Além de permitir pesquisas por meio de filtros, acessar mais informações sobre o medicamento como quandidade no estoque, data validade e descrições e atualização simultânea da listagem de medicamentos após modificações.|
|03|Notificações|Capacidade de notificar o usuário a respeito de ações realizadas ao medicamento (Criação, edição e exclusão) por meio de pop-ups na página web ou por email, contendo mais detalhes a respeito da ação realizada ao medicamento, email este podendo ser enviado para o email do próprio usuário ou para outros emails personalizados.|
|04|Relatórios|Capacidade de gerar relatórios com informações sobre o estoque da farmácia além de possuir alertas a respeito de produtos em falta, em baixa quantidade ou próximos da data de validade. Tais informações serão exibidas em uma página web contendo a opção de baixa-la em formato PDF.|

# Arquitetura da Solução


## Definição dos Componentes

- **Interface Web**: Onde o usuário interage com o sistema.
- **API Gateway**: Ponto de entrada para todas as requisições, responsável por autenticação, autorização e roteamento.
- **Microsserviço "Produto"**: Gerencia as operações relacionadas aos medicamentos.
- **Banco de Dados (SQL Server)**: Armazena os dados dos medicamentos.
- **RabbitMQ**: Sistema para comunicação assíncrona entre microsserviços.
- **Microsserviço "Relatórios"**: Atualiza e gera relatórios de estoque.

## Fluxo de Interação

### Criar um Novo Medicamento

- O usuário (Admin) insere os dados de um novo medicamento na interface web.
- A interface web envia uma requisição HTTP POST para a API Gateway com os dados do novo medicamento.
- A API Gateway valida a autenticação do usuário e verifica as permissões.
- A API Gateway roteia a requisição para o microsserviço “Produto”.
- O microsserviço “Produto” recebe a requisição, valida os dados e insere o novo medicamento no banco de dados (SQL Server).
- Após a inserção, o microsserviço “Produto” envia uma mensagem para o RabbitMQ informando a criação do novo medicamento.
- O microsserviço “Relatórios” recebe a mensagem e atualiza os relatórios de estoque.
- O microsserviço “Produto” retorna uma resposta HTTP 201 (Created) para a API Gateway.
- A API Gateway repassa a resposta para a interface web.
- A interface web exibe uma mensagem de sucesso para o usuário.

### Ler um Medicamento

- O usuário (Admin) solicita a visualização dos dados de um medicamento na interface web.
- A interface web envia uma requisição HTTP GET para a API Gateway.
- A API Gateway valida a autenticação do usuário e verifica as permissões.
- A API Gateway roteia a requisição para o microsserviço “Produto”.
- O microsserviço “Produto” consulta o banco de dados (SQL Server) e retorna os dados do medicamento.
- O microsserviço “Produto” retorna uma resposta HTTP 200 (OK) com os dados do medicamento para a API Gateway.
- A API Gateway repassa a resposta para a interface web.
- A interface web exibe os dados do medicamento para o usuário.

### Atualizar um Medicamento

- O usuário (Admin) edita os dados de um medicamento na interface web.
- A interface web envia uma requisição HTTP PUT para a API Gateway com os dados atualizados.
- A API Gateway valida a autenticação do usuário e verifica as permissões.
- A API Gateway roteia a requisição para o microsserviço “Produto”.
- O microsserviço “Produto” recebe a requisição, valida os dados e atualiza o medicamento no banco de dados (SQL Server).
- Após a atualização, o microsserviço “Produto” envia uma mensagem para o RabbitMQ informando a atualização do medicamento.
- O microsserviço “Relatórios” recebe a mensagem e atualiza os relatórios de estoque.
- O microsserviço “Produto” retorna uma resposta HTTP 200 (OK) para a API Gateway.
- A API Gateway repassa a resposta para a interface web.
- A interface web exibe uma mensagem de sucesso para o usuário.

### Excluir um Medicamento

- O usuário (Admin) solicita a exclusão de um medicamento na interface web.
- A interface web envia uma requisição HTTP DELETE para a API Gateway.
- A API Gateway valida a autenticação do usuário e verifica as permissões.
- A API Gateway roteia a requisição para o microsserviço “Produto”.
- O microsserviço “Produto” recebe a requisição e remove o medicamento do banco de dados (SQL Server).
- Após a exclusão, o microsserviço “Produto” envia uma mensagem para o RabbitMQ informando a exclusão do medicamento.
- O microsserviço “Relatórios” recebe a mensagem e atualiza os relatórios de estoque.
- O microsserviço “Produto” retorna uma resposta HTTP 200 (OK) para a API Gateway.
- A API Gateway repassa a resposta para a interface web.
- A interface web exibe uma mensagem de sucesso para o usuário.

### Atualização do Banco de Dados

- O microsserviço "Produto" recebe a requisição.
- O microsserviço "Produto" valida os dados.
- O microsserviço "Produto" atualiza o medicamento no banco de dados (SQL Server).

### Notificação de Atualização

- Após a atualização, o microsserviço "Produto" envia uma mensagem para o RabbitMQ informando a atualização.

### Atualização de Relatórios

- O microsserviço "Relatórios", subscrito na fila do RabbitMQ, recebe a mensagem.
- O microsserviço "Relatórios" atualiza os relatórios de estoque em background.

### Confirmação da Operação

- O microsserviço "Produto" retorna uma resposta HTTP 200 (OK) para a API Gateway.
- A API Gateway repassa a resposta para a interface web.
- A interface web exibe uma mensagem de sucesso para o usuário.

<!-- ![arq](https://github.com/user-attachments/assets/b9402e05-8445-47c3-9d47-f11696e38a3d) -->

## Tecnologias Utilizadas

- Linguagem de Programação: C# (Backend) / HTML, CSS, JS (Frontend).
- Framework Backend: ASP.NET Core (para criação de APIs RESTful).
- Framework Frontend: React (para interface web responsiva) / React Native (para aplicativo móvel).
- Banco de Dados: SQL Server (confiabilidade e robustez).
- Cache: Redis (armazenamento em memória para alta performance).
- Message Broker: RabbitMQ (comunicação assíncrona e escalabilidade).
- IDEs: Visual Studio, Visual Studio Code.
- Ferramentas: Git (controle de versão), Swagger (documentação da API).

<!-- | Passo | Ação | Detalhes |
|---|---|---|
| 1 | Usuário interage com o sistema | Acessa o sistema via Navegador/Aplicativo. |
| 2 | Requisição enviada para a API | O Navegador/Aplicativo envia a requisição para a API (ASP.NET Core). |
| 3 | Verificação no Cache | A API verifica se os dados solicitados estão presentes no Cache (Redis). |
| 4 | Dados em Cache (Cache Hit) | Se os dados estiverem no cache: <br> - A API recupera os dados do Cache. <br> - A API retorna os dados para o Navegador/Aplicativo. |
| 5 | Dados não encontrados no Cache (Cache Miss) | Se os dados não estiverem no cache: <br> - A API publica uma mensagem na fila (RabbitMQ). |
| 6 | Microserviço processa a mensagem | O Microserviço (C#) consome a mensagem da fila. |
| 7 | Consulta ao Banco de Dados | O Microserviço consulta o Banco de Dados (SQL Server) pelos dados. |
| 8 | Retorno dos dados | O Microserviço retorna os dados para a fila (RabbitMQ). |
| 9 | API processa os dados | A API consome a mensagem da fila com os dados. | 
| 10 | Armazenamento em Cache | A API armazena os dados no Cache (Redis) para futuras requisições. |
| 11 | Retorno para o Usuário | A API retorna os dados para o Navegador/Aplicativo, que os exibe para o Usuário. | -->

```mermaid
graph TD
    A([1. Usuário interage com o sistema]) --> B(2. Requisição enviada para API Gateway)
    B --> C{3. Autenticação/Autorização}
    C -- Válido --> D(4. API Gateway roteia para Microsserviço 'Produto')
    C -- Inválido --> E([5. Retorno de erro para o Usuário])
    D --> F{6. Verificação no Cache}
    F -- Dados em Cache (Cache Hit) --> G(7. API recupera dados do Cache)
    G --> H([8. API retorna dados para o Navegador/Aplicativo])
    F -- Dados não encontrados (Cache Miss) --> I(9. Microsserviço consulta Banco de Dados)
    I --> J(10. Microsserviço retorna dados)
    J --> K(11. Armazenamento em Cache)
    K --> L(12. API retorna dados para API Gateway)
    L --> H
    J --> N(13. Publica mensagem no RabbitMQ)
    N --> O(14. Microsserviço 'Relatórios' processa mensagem)
    O --> P(15. Microsserviço 'Relatórios' atualiza relatórios)
    P --> H

    style A fill:#5cb85c80,stroke:#4cae4c,stroke-width:2px,text-align:center,font-size:12px
    style C fill:#f0ad4e80,stroke:#eea236,stroke-width:2px,text-align:center,font-size:12px
    style E fill:#5cb85c80,stroke:#d9534f,stroke-width:2px,text-align:center,font-size:12px
    style F fill:#f0ad4e80,stroke:#eea236,stroke-width:2px,text-align:center,font-size:12px
    style H fill:#5cb85c80,stroke:#4cae4c,stroke-width:2px,text-align:center,font-size:12px
```

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Referências

DESPERDÍCIO de medicamentos: como evitar a perda dos insumos. [S. l.], 10 ago. 2021. Disponível em: https://nexxto.com/desperdicio-de-medicamentos-como-evitar-a-perda-dos-insumos/#:~:text=O%20desperd%C3%ADcio%20de%20medicamentos%2C%20insumos,n%C3%A3o%20ocorre%20um%20bom%20cuidado. Acesso em: 22 ago. 2024.

LOGÍSTICA hospitalar: dizendo adeus ao desperdício em farmácia. [S. l.], 5 dez. 2023. Disponível em: https://sisnacmed.com.br/logistica-hospitalar-e-combate-ao-desperdicio/#:~:text=O%20Conselho%20Federal%20de%20Farm%C3%A1cia,%C3%A0%20demanda%20real%20do%20hospital. Acesso em: 22 ago. 2024.

O CENÁRIO do desperdício de medicamentos no Brasil. [S. l.], 27 jun. 2014. Disponível em: https://sensorweb.com.br/desperdicio-medicamentos-brasil/#:~:text=Este%20n%C3%BAmero%20representa%20por%20volta,gest%C3%A3o%2C%20seja%20sistem%C3%A1tico%20ou%20n%C3%A3o. Acesso em: 22 ago. 2024.

FALHAS na compra e no armazenamento levam a desperdício de R$ 1 bilhão com medicamentos. [S. l.], 24 abr. 2010. Disponível em: https://oglobo.globo.com/politica/falhas-na-compra-no-armazenamento-levam-desperdicio-de-1-bilhao-com-medicamentos-3018545. Acesso em: 22 ago. 2024.

MP investiga descarte de medicamento fora da validade. [S. l.], 6 nov. 2013. Disponível em: https://exame.com/brasil/mp-investiga-descarte-de-medicamento-fora-da-validade/. Acesso em: 22 ago. 2024.

TRANSPORTE inadequado em MT pode ter estragado mais de 4 mil vacinas. [S. l.], 9 jul. 2013. Disponível em: https://g1.globo.com/mato-grosso/noticia/2013/07/transporte-inadequado-em-mt-pode-ter-estragado-mais-de-4-mil-vacinas.html. Acesso em: 22 ago. 2024.
