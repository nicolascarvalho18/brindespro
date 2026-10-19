# Diagramas completos — BRINDESPRO

Este documento representa a arquitetura e os fluxos atuais do projeto demonstrativo BRINDESPRO. Os dados de empresas, projetos e depoimentos são demonstrativos.

## 1. Visão geral da plataforma

```mermaid
flowchart TB
  Client[Cliente] --> Public[Site público\nNext.js]
  AdminUser[Administrador] --> Admin[Admin\nNext.js]
  Public --> API[API REST\nSpring Boot]
  Admin --> API
  API --> PostgreSQL[(PostgreSQL)]
  API --> Uploads[Artes privadas\nUPLOAD_DIR]
  API --> Swagger[OpenAPI / Swagger]
```

## 2. Mapa das páginas públicas

```mermaid
flowchart LR
  Home[Home] --> Products[Produtos]
  Home --> Kits[Kits]
  Home --> Portfolio[Portfólio]
  Home --> Business[Para empresas]
  Home --> About[Sobre nós]
  Home --> Blog[Blog]
  Home --> Contact[Contato]
  Products --> Detail[Detalhe do produto]
  Detail --> Customize[Personalizar]
  Customize --> Quote[Orçamento]
  Kits --> Quote
  Quote --> Confirmation[Confirmação]
  Confirmation --> Tracking[Acompanhar pedido]
  Tracking --> Timeline[Status e linha do tempo]
```

## 3. Fluxo principal do cliente

```mermaid
flowchart LR
  A[Catálogo] --> B[Seleciona produto]
  B --> C[Escolhe variante, quantidade e gravação]
  C --> D[Envia arte e prévia]
  D --> E[Adiciona ao orçamento]
  E --> F[Preenche dados de contato]
  F --> G[Pedido é registrado]
  G --> H[Recebe número público]
  H --> I[Acompanha com número + e-mail]
  I --> J[Status, itens, prazo e rastreio]
```

## 4. Fluxo de pedidos e atualização administrativa

```mermaid
flowchart TB
  Customer[Cliente cria orçamento] --> Order[Pedido / orçamento]
  Order --> Received[RECEBIDO]
  Received --> Analysis[EM_ANALISE]
  Analysis --> Approval[AGUARDANDO_APROVACAO]
  Approval --> Approved[APROVADO]
  Approved --> Production[EM_PRODUCAO]
  Production --> Shipped[ENVIADO]
  Shipped --> Delivered[ENTREGUE]
  Received --> Cancelled[CANCELADO]
  Analysis --> Cancelled
  Approval --> Cancelled

  Administrator[Administrador] --> OrdersAdmin[Painel de pedidos]
  OrdersAdmin --> Update[Atualiza status, prazo e rastreio]
  Update --> History[Histórico de status]
  History --> Tracking[Consulta pública segura]
```

## 5. Linha do tempo pública

```mermaid
sequenceDiagram
  participant C as Cliente
  participant F as Frontend
  participant A as API
  participant DB as PostgreSQL
  participant AD as Admin

  C->>F: Informa número e e-mail
  F->>A: GET /api/orders/track
  A->>DB: Valida número + e-mail
  DB-->>A: Pedido e histórico público
  A-->>F: Status, itens, prazo e rastreio
  F-->>C: Exibe linha do tempo
  AD->>A: PATCH status do pedido
  A->>DB: Registra status e auditoria
```

## 6. Painel administrativo

```mermaid
flowchart TB
  Login[Login administrativo] --> Dashboard[Dashboard]
  Dashboard --> Catalog[Produtos e categorias]
  Dashboard --> Pricing[Preços, cores e materiais]
  Dashboard --> Kits[Kits]
  Dashboard --> Quotes[Orçamentos]
  Dashboard --> Orders[Pedidos e notificações]
  Dashboard --> Portfolio[Portfólio]
  Dashboard --> Contacts[Contatos]
  Dashboard --> Reports[Relatórios]
  Dashboard --> Users[Usuários]
  Orders --> Status[Status, prazo, rastreio e histórico]
  Portfolio --> PortfolioForm[Cadastrar, editar, destacar ou ocultar]
```

## 7. Fluxo de autenticação administrativa

```mermaid
sequenceDiagram
  participant A as Administrador
  participant F as Frontend
  participant API as Spring Security
  participant DB as PostgreSQL

  A->>F: E-mail e senha
  F->>API: POST /api/auth/login
  API->>DB: Consulta AdminUser
  DB-->>API: Hash e perfil ativo
  API-->>F: Sessão HTTP-only
  F->>API: Requisição /api/admin/* + CSRF
  API-->>F: Dados administrativos
```

## 8. Módulos da API

```mermaid
flowchart LR
  Controller[Controllers REST] --> Service[Services]
  Service --> Repository[Repositories JPA]
  Repository --> DB[(PostgreSQL)]
  Controller --> Validation[Bean Validation]
  Controller --> Security[Spring Security]
  Service --> Audit[Audit log]

  subgraph Domínios
    Catalog[Catalog]
    Quote[Quote]
    Order[Order]
    Portfolio[Portfolio]
    Contact[Contact]
    Admin[Admin]
  end
  Controller --> Domínios
```

## 9. Modelo de dados principal

```mermaid
erDiagram
  CATEGORY ||--o{ PRODUCT : organiza
  PRODUCT ||--o{ PRODUCT_VARIANT : possui
  PRODUCT ||--o{ PRICING_TIER : possui
  CUSTOMER ||--o{ QUOTE : solicita
  QUOTE ||--o{ QUOTE_ITEM : possui
  QUOTE ||--o{ QUOTE_FILE : recebe
  QUOTE ||--o{ ORDER_STATUS_HISTORY : registra
  PORTFOLIO_PROJECT ||--o{ PORTFOLIO_TESTIMONIAL : relaciona

  CUSTOMER { bigint id string name string email string phone }
  QUOTE { bigint id string number string order_status decimal total date expected_delivery_date string tracking_code }
  QUOTE_ITEM { bigint id bigint product_id int quantity decimal unit_price }
  ORDER_STATUS_HISTORY { bigint id string status string changed_by datetime created_at }
  PORTFOLIO_PROJECT { bigint id string name string segment bool featured bool active }
```

## 10. Upload de arte

```mermaid
flowchart LR
  Customer[Cliente] --> Form[Formulário de personalização]
  Form --> Upload[Upload temporário]
  Upload --> Validation[Tipo, tamanho e assinatura]
  Validation --> Private[Diretório privado]
  Private --> Token[Token de vínculo]
  Token --> Quote[Orçamento]
  Quote --> Admin[Download administrativo autenticado]
```

## 11. Portfólio demonstrativo

```mermaid
flowchart LR
  PublicPortfolio[Portfólio público] --> Filter[Filtro por segmento]
  Filter --> Technology[Tecnologia]
  Filter --> Events[Eventos]
  Filter --> Health[Saúde]
  Filter --> RealEstate[Imobiliário]
  Filter --> Teams[Equipes]
  PublicPortfolio --> Featured[Projetos em destaque]
  PublicPortfolio --> Testimonials[Depoimentos demonstrativos]
  AdminPortfolio[Admin / Portfólio] --> CRUD[Criar, editar, ocultar, excluir]
  AdminPortfolio --> Highlight[Marcar como destaque]
  CRUD --> PublicPortfolio
```

## 12. Segurança e fronteiras de acesso

```mermaid
flowchart TB
  Public[Internet] --> PublicRoutes[Rotas públicas]
  PublicRoutes --> Track[Tracking exige número + e-mail]
  Public --> Login[Login admin]
  Login --> Session[Sessão HTTP-only + CSRF]
  Session --> AdminRoutes[/api/admin/*]
  AdminRoutes --> ProtectedData[Pedidos, portfólio, configurações]
  Uploads[Artes privadas] --> AdminOnly[Acesso administrativo]
```

## 13. Deploy recomendado

```mermaid
flowchart LR
  GitHub[Repositório Git] --> CI[CI: testes e builds]
  CI --> Vercel[Vercel\nNext.js]
  CI --> Runtime[Render / Railway / Fly.io\nSpring Boot]
  Runtime --> ManagedDB[PostgreSQL gerenciado]
  Runtime --> Storage[Volume persistente ou storage externo]
  Vercel --> Users[Usuários]
  Runtime --> Users
```

## 14. Estados de interface

```mermaid
stateDiagram-v2
  [*] --> Loading
  Loading --> Content: sucesso
  Loading --> Empty: sem registros
  Loading --> Error: falha de API
  Error --> Loading: tentar novamente
  Empty --> Content: novo registro ou filtro alterado
  Content --> Loading: atualização
```

## 15. Resumo de responsabilidade

| Parte | Responsabilidade |
| --- | --- |
| Next.js | Navegação, interface, estado de orçamento e consumo da API. |
| Spring Boot | Regras de negócio, segurança, validação e API REST. |
| PostgreSQL | Dados persistentes, pedidos, catálogo, portfólio e auditoria. |
| Flyway | Evolução versionada do banco. |
| Upload privado | Artes enviadas pelo cliente, acessíveis ao atendimento administrativo. |
| Admin | Gestão do catálogo, pedidos, portfólio, contatos e relatórios. |
