# BRINDESPRO

Plataforma de brindes personalizados baseada nas 14 telas da referência enviada: catálogo, simulador, editor de arte, kits, orçamentos e administração. O frontend é Next.js 15 com App Router, TypeScript, Tailwind CSS, React Hook Form, Zod, TanStack Query, Zustand, Lucide e Recharts. A API é Spring Boot 3.4, Java 21, JPA, Spring Security, Flyway e PostgreSQL.

## Estrutura

| Pasta | Conteúdo |
| --- | --- |
| `frontend/src/app` | Páginas públicas e administrativas |
| `frontend/src/components` | Cabeçalho, cards e indicadores reutilizáveis |
| `frontend/src/lib` | Cliente da API, tipos e estado do orçamento |
| `frontend/public/images` | Fotografias criadas para este projeto |
| `backend/src/main/java/br/com/brindespro` | Domínios catálogo, preço, orçamento, administração e segurança |
| `backend/src/main/resources/db/migration` | Migrações versionadas Flyway |
| `backend/src/test` | Testes de integração com banco de teste |
| `scripts` | Atalhos PowerShell para Windows |

## Pré-requisitos

- Windows com JDK 21, Maven 3.9+, Node.js 20+ e PostgreSQL 15+ instalados.
- Porta 8080 livre para a API e 3000 para o frontend.
- Diretório de upload com permissão de escrita para o processo Java.

Docker não é necessário.

## Banco de dados

No PostgreSQL, crie um banco e um usuário próprios:

```sql
CREATE USER brindespro WITH PASSWORD 'troque-esta-senha';
CREATE DATABASE brindespro OWNER brindespro;
```

Configure as variáveis em uma sessão PowerShell. Os exemplos completos estão em [`backend/.env.example`](backend/.env.example) e [`frontend/.env.example`](frontend/.env.example). Os arquivos `.env.example` documentam valores; o backend lê variáveis do ambiente. Não copie credenciais reais para o repositório.

```powershell
$env:DB_URL = 'jdbc:postgresql://localhost:5432/brindespro'
$env:DB_USER = 'brindespro'
$env:DB_PASSWORD = 'sua-senha-local'
$env:ADMIN_EMAIL = 'admin@empresa.com'
$env:ADMIN_PASSWORD = 'uma-senha-longa-e-exclusiva'
$env:UPLOAD_DIR = 'C:\dados\brindespro\artes'
$env:FRONTEND_ORIGIN = 'http://localhost:3000'
$env:DEMO_DATA = 'true'
```

`DEMO_DATA=true` insere sete categorias e produtos de exemplo somente se o catálogo estiver vazio. Em produção, deixe `DEMO_DATA=false` e cadastre produtos no painel. A conta administrativa é criada apenas no primeiro início, quando `ADMIN_EMAIL` e `ADMIN_PASSWORD` têm valores definidos e a senha possui pelo menos 16 caracteres. Altere a senha de bootstrap fora do sistema antes de publicar.

As migrações `V1` a `V4` são aplicadas automaticamente na inicialização. `ddl-auto=validate` verifica o mapeamento JPA sem modificar o esquema. Faça backup do banco e do diretório de artes juntos.

## Execução local

Em dois terminais PowerShell, na raiz do projeto:

```powershell
.\scripts\start-backend.ps1
.\scripts\start-frontend.ps1
```

Abra `http://localhost:3000`; o painel fica em `/admin/login`. O Next.js repassa chamadas de `/api` à API local. Documentação OpenAPI: `http://localhost:8080/swagger-ui.html`.

Para build e testes:

```powershell
cd backend
mvn test
mvn package
cd ..\frontend
npm ci
npm run build
```

Os testes de integração usam H2 apenas no escopo de testes e executam as migrações Flyway. A execução normal usa PostgreSQL. Antes de implantar, teste também contra um PostgreSQL real do ambiente de destino.

## Fluxos

1. Catálogo e filtros consultam a API; o simulador busca preços e regras atuais no backend.
2. O cliente adiciona itens ao orçamento, envia a arte e revisa o resumo. O estado temporário fica no navegador; o preço oficial é recalculado em Java ao registrar.
3. O orçamento recebe número único e salva um snapshot dos valores, opções e descrições. Arquivos ficam fora da pasta pública, exigem um token recebido no upload para serem vinculados ao orçamento e o download exige sessão administrativa.
4. O frontend monta a mensagem com produto, cor, material, quantidade, gravação, posição, prazo, preço unitário e total, e abre o WhatsApp configurado no painel. O sistema registra o orçamento e o início da abertura, sem afirmar que a mensagem foi entregue. Se o navegador bloquear a nova aba, a confirmação oferece um link para abri-la manualmente.
5. O painel permite gerir produtos, categorias, cores, materiais, imagens por URL, preços, kits, status de orçamentos, regras de personalização e número de WhatsApp. Gráficos e indicadores usam os registros do banco.

## Regra de preço

Para cada linha, a faixa de quantidade determina o preço base unitário. Os percentuais de gravação, posição e prazo **somam sobre esse preço base**. O desconto de um kit cadastrado incide depois dos acréscimos. O resultado unitário é arredondado para centavos com `HALF_UP` e multiplicado pela quantidade. A API rejeita quantidade abaixo do mínimo, variante não pertencente ao produto, gravação incompatível e faixa ausente. Os percentuais e faixas podem ser alterados no painel; orçamentos anteriores mantêm o snapshot.

## Segurança e implantação

- Sessão administrativa HTTP-only com proteção CSRF. Use HTTPS e `Secure` no cookie atrás de um proxy de produção.
- Upload limitado a 5 MB, com verificação de assinatura de PNG/JPEG/PDF e lista restrita de elementos/atributos SVG. O servidor não executa arquivos enviados.
- Configure backup, monitoramento, controle de acesso ao diretório de uploads, proxy HTTPS e política de retenção antes de produção.
- O catálogo administrativo aceita URLs de imagem; use caminhos locais confiáveis ou um serviço de mídia aprovado. As fotos incluídas foram geradas para este projeto, não extraídas da imagem de referência.
- O número de WhatsApp deve ser configurado em **Administração → Configurações**; também pode ser definido como fallback em `NEXT_PUBLIC_WHATSAPP_NUMBER` no frontend.

## Limites da verificação nesta entrega

O build do frontend, a checagem TypeScript, as migrações em banco de teste e os testes Java foram executados. O fluxo catálogo → simulador → orçamento → painel foi verificado no navegador com dados de demonstração. Este ambiente não tinha PostgreSQL instalado; a execução real com PostgreSQL e a validação final de implantação dependem de uma instância configurada. Para obter fidelidade fotográfica exata à montagem original, são necessários os arquivos originais das fotos; o repositório contém imagens equivalentes geradas para uso no projeto.
