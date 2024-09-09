## 1. Diagrama de Contexto

### 1.1. Descrição do Diagrama de Contexto
O diagrama de contexto fornece uma visão geral do sistema "Posso abrir aí?" e suas interações com os atores externos.

- **Sistema:** Posso abrir aí?
- **Atores Externos:** Usuários (Empreendedores, Empresas Estabelecidas, Consultores), Sistemas Externos (GeoSampa, Google OAuth), Prefeitura do Recife

### 1.2. Diagrama
![Diagrama de Contexto](path/para/diagrama-contexto.png)

### 1.3. Descrição dos Componentes
- **Atores Externos:**
  - **Empreendedores:** Consultam o mapa interativo e buscam informações sobre regiões.
  - **Consultores:** Utilizam os dados para análise e consultoria.
  - **Prefeitura do Recife:** Fornece dados públicos sobre a abertura e fechamento de empresas.
- **Sistema:** Plataforma para consulta de dados de empresas e regiões em Recife, facilitando a tomada de decisão de empreendedores sobre onde abrir negócios.

---

## 2. Diagrama de Container

### 2.1. Descrição do Diagrama de Container
O diagrama de container mostra os principais containers que compõem o sistema "Posso abrir aí?" e suas interações.

- **Containers Incluídos:** Aplicação Web, API (Next.js), Banco de Dados (PostgreSQL), Sistema de Login Social (Google OAuth), Serviço de Mapa Interativo (GeoSampa)

### 2.2. Diagrama
![Diagrama de Container](path/para/diagrama-container.png)

### 2.3. Descrição dos Containers
- **Aplicação Web (React.js):** Interface para os usuários interagirem com o sistema, incluindo login social, mapa interativo e modais para detalhamento de empresas.
  - **Tecnologias:** React.js, Google OAuth
  - **Responsabilidade:** Exibição de informações e interação com os usuários.
  - **Interações:** API, GeoSampa, Banco de Dados
- **API (Next.js):** Backend responsável por salvar e atualizar dados de usuários e empresas.
  - **Tecnologias:** Next.js, Axios
  - **Responsabilidade:** Fornecer dados para o frontend e gerenciar a integração com o banco de dados.
  - **Interações:** Banco de Dados (PostgreSQL), Aplicação Web
- **Banco de Dados (PostgreSQL):** Armazena dados de empresas, usuários e histórico de regiões.
  - **Tecnologias:** PostgreSQL
  - **Responsabilidade:** Manter as informações de empresas, usuários e suas atualizações periódicas.
  - **Interações:** API

---

## 3. Diagrama de Componente

### 3.1. Descrição do Diagrama de Componente
O diagrama de componente detalha a arquitetura interna da API e da Aplicação Web, mostrando os componentes que compõem cada container.

- **Container Focado:**  API (Next.js)

### 3.2. Diagrama
![Diagrama de Componente](path/para/diagrama-componente.png)

### 3.3. Descrição dos Componentes
- **Componente de Login:** Gerencia a autenticação dos usuários via Google OAuth.
  - **Responsabilidade:** Autenticação de usuários.
  - **Interações:** [Componentes com os quais interage]
  - **Tecnologias:** [Linguagens, frameworks, bibliotecas]

---

## 4. Diagrama de Código (Opcional)

### 4.1. Descrição do Diagrama de Código
Este nível detalha o design e a arquitetura do código dentro de um componente específico. Ideal para sistemas complexos ou quando há necessidade de documentar padrões de design específicos.

### 4.2. Diagrama
![Diagrama de Código](path/para/diagrama-codigo.png)

### 4.3. Descrição do Código
- **[Nome da Classe/Módulo]:** Descrição da estrutura de código, padrões de design utilizados e principais responsabilidades.
  - **Métodos:** [Descrição dos principais métodos e sua funcionalidade]
  - **Padrões de Design:** [Padrões de design aplicados, como Singleton, Factory, etc.]

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
