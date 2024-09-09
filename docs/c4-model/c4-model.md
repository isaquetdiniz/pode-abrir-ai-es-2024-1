## 1. Diagrama de Contexto

### 1.1. Descrição do Diagrama de Contexto

O diagrama de contexto fornece uma visão geral do sistema "Posso abrir aí?" e suas interações com os atores externos.

- **Sistema:** Posso abrir aí?
- **Atores Externos:** Usuários (Empreendedores, Empresas Estabelecidas, Consultores), Sistemas Externos (GeoSampa, Google Auth), Prefeitura do Recife

### 1.2. Diagrama

![Diagrama de Contexto](/docs/c4-model/diagrama-de-contexto.png)

### 1.3. Descrição dos Componentes

- **Atores Externos:**
  - **Empreendedores:** Consultam o mapa interativo e buscam informações sobre regiões.
  - **Consultores:** Utilizam os dados para análise e consultoria.
  - **Prefeitura do Recife:** Fornece dados públicos sobre a abertura e fechamento de empresas.
- **Sistema:** Plataforma para consulta de dados de empresas e regiões em Recife, facilitando a tomada de decisão de empreendedores sobre onde abrir negócios.

---

# 2. Diagrama de Container

### 2.1. Descrição do Diagrama de Container

O diagrama de container ilustra os principais componentes do sistema "Posso abrir aí?" e suas interações, divididos entre o Frontend/Cliente e o Backend.

- **Containers Incluídos:** Aplicação Web, API Service, Banco de Dados (PostgreSQL), Sistema de Login Social (Google Auth), Serviço de Mapa Interativo (OpenLayers)

### 2.2. Diagrama

![Diagrama de Container](/docs/c4-model/diagrama-de-container.png)

### 2.3. Descrição dos Containers

- **Aplicação Web (React.js):** Interface gráfica para os usuários acessarem o sistema. Inclui funcionalidades como login social, visualização do mapa interativo e modais com informações detalhadas sobre empresas.
  - **Tecnologias:** React.js, OpenLayers, Google Auth
  - **Responsabilidade:** Fornecer uma interface amigável para interação com os dados e funções do sistema.
  - **Interações:** API Service, OpenLayers (mapa), Google Auth (login)

- **API Service (Next.js):** Backend responsável por fornecer dados para o frontend e gerenciar a lógica de negócios, como o armazenamento e atualização de informações de empresas e usuários.
  - **Tecnologias:** Next.js, Axios, Docker
  - **Responsabilidade:** Processamento de requisições, gerenciamento de dados e integração com o banco de dados.
  - **Interações:** Banco de Dados (PostgreSQL), Aplicação Web

- **Banco de Dados (PostgreSQL):** Repositório que armazena informações sobre empresas, usuários e dados geográficos relevantes para a aplicação.
  - **Tecnologias:** PostgreSQL
  - **Responsabilidade:** Armazenar dados estruturados, como detalhes das empresas e informações dos usuários.
  - **Interações:** API Service

- **Sistema de Login Social (Google Auth):** Serviço de autenticação utilizado para login seguro dos usuários através das credenciais Google.
  - **Tecnologias:** Google Auth
  - **Responsabilidade:** Prover autenticação e gerenciamento de sessão dos usuários.
  - **Interações:** Aplicação Web

- **Serviço de Mapa Interativo (OpenLayers):** Ferramenta de visualização de mapas usada para exibir dados geográficos relevantes dentro da aplicação.
  - **Tecnologias:** OpenLayers
  - **Responsabilidade:** Fornecer a interface de mapa interativo para visualização dos locais de interesse.
  - **Interações:** Aplicação Web

- **CRON Jobs:** Serviço automatizado que atualiza periodicamente os dados das empresas, sincronizando as informações com o banco de dados.
  - **Responsabilidade:** Atualizar os dados de empresas e regiões com base nos dados fornecidos pelo serviço de Dados Recife.
  - **Interações:** API Service, Banco de Dados

---

## 3. Diagrama de Componente

### 3.1. Descrição do Diagrama de Componente

O diagrama de componente detalha os principais módulos do sistema **"Posso abrir aí?"**, ilustrando como os diferentes componentes interagem entre si, tanto no frontend quanto no backend.

- **Componentes Incluídos:** Autenticação, Usuários, Pesquisa, Localização, Empresas.

### 3.2. Diagrama

![Diagrama de Componente](/docs/c4-model/diagrama-de-componentes.png)

### 3.3. Descrição dos Componentes

- **Autenticação (Google OAuth):** Responsável por gerenciar a autenticação dos usuários através do login social com o Google.
  - **Responsabilidade:** Autenticação segura dos usuários.
  - **Interações:** Usuário ↔ Plataforma (via API).
  - **Tecnologias:** Google OAuth.

- **Usuários:** Componente que gerencia as informações dos usuários cadastrados na plataforma.
  - **Responsabilidade:** Manutenção e gestão dos dados dos usuários.
  - **Interações:** Autenticação ↔ Pesquisa, Autenticação ↔ Empresas.
  - **Tecnologias:** Banco de Dados (PostgreSQL).

- **Pesquisa:** Componente que permite a pesquisa de dados de empresas e localidades, com base nos critérios fornecidos pelos usuários.
  - **Responsabilidade:** Gerenciar a lógica de pesquisa e filtragem dos dados.
  - **Interações:** Usuários ↔ Localização.
  - **Tecnologias:** Algoritmo de pesquisa, Banco de Dados.

- **Localização:** Componente responsável por gerenciar a lógica de visualização dos dados geográficos.
  - **Responsabilidade:** Fornecer dados geográficos relevantes para a visualização no mapa.
  - **Interações:** Pesquisa ↔ Empresas, OpenLayers.
  - **Tecnologias:** OpenLayers, Banco de Dados.

- **Empresas:** Componente que gerencia as informações sobre as empresas cadastradas e fornece insights para os usuários.
  - **Responsabilidade:** Armazenar e exibir dados das empresas.
  - **Interações:** Localização ↔ Pesquisa, Localização ↔ Usuários.
  - **Tecnologias:** PostgreSQL.

---

## 5. Decisões Arquiteturais

### 5.1. Decisões Importantes

- **Decisão:** Utilização de cronjobs para sincronizar dados.
  - **Descrição:** Decidimos sincronizar os dados de maneira gradual através de um processo de ETL utilizando cronjobs.
  - **Justificativa:** Tendo em vista que a extração dos dados ocorrerá de uma plataforma de dados aberta mantida pela prefeitura, afim de evitar latência e possíveis indiponibilidades dos dados utilizaremos cronjobs para realizar o processo de extração, carregamento e transformação dos dados abertos diretamente para um banco de dados próprio.
  - **Impacto:** Impacta diretamente na maneira como os dados são consumidos, assumindo que em algum momento os dados podem estar desatualizados com a fonte, também impacta no tempo de resposta, tendo em vista que os dados estarão num banco de dados próprio, diminuindo a dependência com outros sistemas.

- **Decisão:** Aplicação monolítica (frontend e backend integrados).
  - **Descrição:** Decidimos realizar o desenvolvimento do frontend e do backend de forma integrada no mesmo projeto utilizando um framework web amplamente utilizado chamado Next.js.
  - **Justificativa:** Considerando a complexidade do sistema e sua entrega, fez sentido utilizar um framework web que "volta as origens" do desenvolvimento web, oferecendo um ferramental para o desenvolvimento do frontend e do backend no mesmo projeto, repositório, imagem do Docker e fluxo de entrega e testes.
  - **Impacto:** Trás agilidade no desenvolvimento e entrega da aplicação. É possível configurar apenas um ambiente, uma pipeline de testes e as mudanças na aplicação são refletidas quase que instantaneamente no repositório principal, branches que estão em desenvolvimento e features tanto de frontend como de backend.

---

## 6. Considerações Finais

### 6.1. Padrões e Práticas

- **Padrões:** ETL, Cronjobs, Monolito, Clean Architecture.
- **Práticas:** Git e Github (repositório remoto), Continuous Integration (checagem de estilo e formatação de código, bateria de testes), Continuos Delivery (deploy automático na plataforma da vercel), Branch protection rules (regras de proteção de branches), Code review.

### 6.2. Próximos Passos

Indique quaisquer melhorias futuras ou áreas a serem exploradas para a evolução da arquitetura.

---

**Autores:**  Maria Bezerra de Mello Araújo, Isaque Teixeira Diniz, Guilherme Vinicius Cesar Cavalcante
**Data:** 09/09/2024
