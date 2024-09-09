## 1. Diagrama de Contexto

### 1.1. Descrição do Diagrama de Contexto
O diagrama de contexto fornece uma visão geral do sistema "Posso abrir aí?" e suas interações com os atores externos.

- **Sistema:** Posso abrir aí?
- **Atores Externos:** Usuários (Empreendedores, Empresas Estabelecidas, Consultores), Sistemas Externos (GeoSampa, Google Auth), Prefeitura do Recife

### 1.2. Diagrama
![Diagrama de Contexto](/Diagrama_de_Contexto.png)

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
![Diagrama de Container](path/para/diagrama-container.png)

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
O diagrama de componente detalha a arquitetura interna da API e da Aplicação Web, mostrando os componentes que compõem cada container.

- **Container Focado:**  API (Next.js)

### 3.2. Diagrama
![Diagrama de Componente](path/para/diagrama-componente.png)

### 3.3. Descrição dos Componentes
- **Componente de Login:** Gerencia a autenticação dos usuários via Google Auth.
  - **Responsabilidade:** Autenticação de usuários.
  - **Interações:** Entre Usuário e Plataforma
  - **Tecnologias:** Google Auth

---

## 5. Decisões Arquiteturais

### 5.1. Decisões Importantes
Documente aqui as decisões arquiteturais importantes que foram tomadas durante o desenvolvimento do projeto, incluindo justificativas e impactos.

- **Decisão:** [Nome ou breve descrição da decisão]
  - **Descrição:** [Detalhes sobre a decisão]
  - **Justificativa:** [Motivo pelo qual a decisão foi tomada]
  - **Impacto:** [Impacto da decisão no sistema]

---

## 6. Considerações Finais

### 6.1. Padrões e Práticas
Liste os padrões arquiteturais e práticas recomendadas que foram seguidos durante o desenvolvimento da arquitetura.

- **Padrões:** [Ex: MVC, CQRS, Event-Driven Architecture]
- **Práticas:** [Ex: Continuous Integration, Code Review, etc.]

### 6.2. Próximos Passos
Indique quaisquer melhorias futuras ou áreas a serem exploradas para a evolução da arquitetura.

---

**Autores:**  Maria Bezerra de Mello Araújo, Isaque Teixeira Diniz, Guilherme Vinicius Cesar Cavalcante
**Data:** 09/09/2024
