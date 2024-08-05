# Project Model Canvas Template para Projetos de Software

## 1. Objetivos e Justificativas
O objetivo do projeto "Posso abrir aí?" é fornecer insights valiosos que podem embasar decisões estratégicas tanto para novos empreendedores quanto para empresas estabelecidas que buscam consultoria. Melhorar o mapeamento sobre o historico dos emprendimentos em Recife, afim de analisar e ajudar os empreendedores na escolha da melhor região para abrir o seu negócio. 

## 2. Requisitos Principais
- Integração com o geosampa para trazer um mapa interativo para o usuario buscar informações da licalidade escolhida
- Login social (google)
- Cadastro de usuarios
- Um JOB para atualizar os dados das empresas e localizações automaticamente em um banco dados postgres, com uma frequencia de -3d
- Search bar para usuario buscar localização no mapa
- Modal de detalhamento indicando empresas abertas naquela localização
- Modal para atualização de dados do usuario

Uma plataforma de facil acesso, que ajude os empreendedores nas pesquisas e estudos de onde melhor abrir o seu empreendimento em Recife. Para isso é necessario um mapa interativo afim de facilitar a localização da região escolhidada pelo usuario e também uma atualização de até 2 dias na base de dados com novas informações sobre a abertura e fechamento das empresas na cidade, para garantir a veracidade das informações e ajudar os usuarios na decisão de onde abrir o seu negócio.

## 3. Stakeholders
Usuários Finais: Empreendedores, empresas estabelecidas, consultores.
Equipe de Projeto: Desenvolvedores de software, gestores de projeto.
Outros Interessados: Prefeitura do Recife, consultores, investidores, comunidade local.

## 4. Entregas 
- API - next.js (api para salvar os dados dos usuarios que acessam, atualizar a base de dados sobre os registros de abertura e fechamento das empresasa em recife e rotas exportar essas informações ao frontend);
- Plataforma digital funcional - react.js (frontend desktop com login social com google, complete seu cadastro, mapa com drag em drop, detalhamento de historio da região e barra de pesquisa para facilitar busca);
- Cronograma (documentação detalhando os marcos das entregas de cada funcionalidade do sistema);
- Documentação de requisitos (documentação com o detalhamento de cada requisito para ser integrador e desenvolvido no sistema);
- Project charter (documentação inicial do projeto como uma certidão de nascimento, afim de alinhar os acordos, principais obijetivos do projeto e data de inicio e fim).

## 5. Marcos e Cronograma

Estruturação e inicio 19/08/2024
-   Estruturação do projeto
-   mockup de telas
-   documentação de arquitetura
-   CRUD de empresas
-   tela de login

JOB de empresas e Auth 02/09/2024
- autenticação via google
- CRUD usuarios
- JOB para atualização automatica do dados de empresa
- layout de pagina inicial

Integração com mapa e cadastro 16/09/2024
- integrar com lib de mapa
- funcionalidade de busca no mapa
- tela integrada de cadastro inicial

Detalhamento de empresas e edição de usuario 30/09/2024
- detalhamento de empresa
- modal para edição de dados de usuario

Ajustes final e Deploy da plataforma 04/09/2024
- configuração da vercel
- ajustes e melhorias finais

## 6. Riscos e Suposições
- O time não ter disponibilidade para atuar em tudo que está sendo proposto.
- A base de dados que servirá como base parar se ser atualizada.
- A base de dados não ter dados suficientes para extrair o valor que esperamos com a plataforma.
- O empreeendedor não achar a plataforma atrativa e não ter adesão e uso.

## 7. Orçamento
Estamos considerando uma alocação semanal de 6 horas por semana de cada integrante do time. O que resulta em 18 horas por semana no projeto. Considerando o início do projeto no dia 05/08/2024 e a finalização no dia 04/10/2024 - na realidade a finalização será no dia 07 ou 09 com a apresentação final, temos praticamente 9 semanas. Resultando num total de 162 horas.
Afim de conhecimento, fizemos uma pesquisa na internet e encontramos um valor médio de R$ 80,00 reais por hora para um desenvolvedor júnior como freelancer, considerando que o projeto seria desenvolvido apenas por desenvolvedores juniores, e naturalmente apenas suas habilidades técnicas seriam necessárias, teríamos um custo de R$ 12.960,00 apenas com mão de obra para o projeto.

## 8. Premissas
- O time possui disponbilidade de 18 horas por semana, o que afeta diretamente o planejamento das tarefas e o que vai ser efetivamente entregue.
- Os dados disponibilizados serão públicos pelo menos até o final do projeto, eles deixando de serem públicos o projeto deve ser parado pois podem haver problemas legais envolvidos.
- Conseguimos trazer alto valor com a solução, isso afeta diretamente a motivação do time em entregar a uma solução final que impacte o ecossistema.

## 9. Restrições
- O time possuí uma baixa disponibilidade para atuar no projeto, cerca de 6 horas por semana por pessoa.
- Não será desenvolvida versão mobile para a plataforma.
- Trabalharemos apenas com dados públicos, inicialmente os da prefeitura mas nada impede que novas bases possam ser utilizadas se julgado positivo para o projeto.
- Utlizaremos apenas ferramentas gratuitas em todo o projeto para não gerar custos para o time. 
