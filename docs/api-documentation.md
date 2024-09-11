# Documentação da API - Posso Abrir Aí?

---

## 1. Propósito e Funcionalidade
**Descrição Geral:**
- **Propósito:** A API “Posso Abrir Aí?” tem como objetivo fornecer informações sobre o histórico de empresas abertas e fechadas em Recife. Seu principal propósito é ajudar novos empreendedores e empresas estabelecidas na escolha da melhor localização para seus negócios, com base em dados atualizados sobre a região desejada.
- **Funcionalidade:** A API permite a consulta de empresas abertas e fechadas, atualiza automaticamente os dados a cada três dias e disponibiliza informações através de um mapa interativo, onde os usuários podem realizar buscas específicas por região.

## 2. Especificação Técnica

**Endpoints e Métodos:**
- **URL Base:** [https://api.possoabrirai.com](https://api.possoabrirai.com)
- **Endpoint:** `/empresas`
- **Método Suportado:** `GET`

**Parâmetros de Requisição:**
- **Parâmetros na URL ou Corpo da Requisição:**
  - `localidade ` (Tipo: String, Obrigatório): Localização desejada para a busca das empresas.

**Formato de Dados:**
- **Entrada:** JSON.
- **Saída:** JSON.

**Exemplo de Requisição:**
```http
GET /empresas?localidade=Recife HTTP/1.1
Host: api.possoabrirai.com
Authorization: Bearer {token}
```

**Exemplo de Resposta:**
```json
{
  "empresas": [
    {
      "nome": "Empresa Exemplo",
      "data_abertura": "2024-09-10",
      "localidade": "Recife",
      "status": "aberta"
    }
  ]
}
```

**Códigos de Resposta e Descrições:**
- **200 OK:** Sucesso.
- **400 Bad Request:** Parâmetros inválidos.
- **404 Not Found:** Não encontrado.
- **500 Internal Server Error:** Erro no servidor.

- **Endpoint:** ` /usuarios`
- **Método Suportado:** `POST`

**Parâmetros de Requisição:**
- **Parâmetros na URL ou Corpo da Requisição:**
  - `email ` (Tipo: String, Obrigatório): Email do usuário.
  - `senha ` (Tipo: String, Obrigatório): Senha do usuário.

**Formato de Dados:**
- **Entrada:** JSON.
- **Saída:** JSON.

**Exemplo de Requisição:**
```http
POST /usuarios HTTP/1.1
Host: api.possoabrirai.com
Content-Type: application/json
{
  "email": "usuario@exemplo.com",
  "senha": "minhasenha"
}
```

**Exemplo de Resposta:**
```json
{
  "message": "Usuário criado com sucesso",
  "id": "12345"
}
```

**Códigos de Resposta e Descrições:**
- **201 OK:** Sucesso.
- **400 Bad Request:** Parâmetros inválidos.
- **500 Internal Server Error:** Erro no servidor.

## 3. Segurança e Autorização

**Autenticação:**
- **Método:** Método: OAuth2 com tokens JWT.
- **Exemplo de Cabeçalho de Autenticação:**
```http
Authorization: Bearer {token}
```

**Autorização:**
- Apenas usuários autenticados podem acessar endpoints protegidos, como /empresas e /usuarios.
- O sistema utilizará RBAC (controle de acesso baseado em papéis) para limitar as permissões de determinados usuários.

**Medidas de Proteção de Dados:**
- **Transmissão Segura:**  A API utiliza HTTPS para garantir a segurança na transmissão dos dados.
- **Criptografia:** Dados sensíveis, como senhas de usuários, são criptografados.

## 4. Monitoramento e Performance

**Monitoramento:**
- **Ferramentas Utilizadas:** Utilizaremos o próprio ferramental disponibilizado pela Vercel.
- **Métricas Monitoradas:** Taxa de erro, quantidade de requests, uso de cpu e memória, uso de banda.

**Desempenho:**
- **Limites de Taxa (Rate Limits):** 100 requisições por minuto.
- **Otimização:** Uso de caching para reduzir o tempo de resposta e balanceamento de carga para distribuir a carga do servidor.

**Escalabilidade:**
- A própria Vercel oferece no plano pago a possibilidade de escalar a aplicação automaticamente a medida que o uso vai aumentando.

## 5. Versionamento e Compatibilidade

**Política de Versionamento:**
- A API segue uma estratégia de versionamento via URL. A versão atual é /v1/.
- **Exemplo:** `/v1/empresas`.

**Compatibilidade:**
- As mudanças que quebram compatibilidade são anunciadas com antecedência. O suporte a versões anteriores será mantido por um período limitado.

## 6. Recursos Adicionais

**Links de Referência:**
- Documentação oficial do OAuth2: https://oauth.net/2/
- Documentação JSON Web Tokens: https://jwt.io/introduction/
---