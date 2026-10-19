# Deploy BRINDESPRO

## Frontend

Publique `frontend` na Vercel. Configure `NEXT_PUBLIC_API_URL` quando a API estiver em domínio separado. O pipeline deve executar `npm ci`, `npm run test` e `npm run build`.

## Backend

Publique `backend` em Render, Railway ou Fly.io com Java 21. Configure `DB_URL`, `DB_USER`, `DB_PASSWORD`, `FRONTEND_ORIGIN` e `UPLOAD_DIR`. Use PostgreSQL gerenciado e mantenha Flyway ativo.

## Operação

- Use HTTPS.
- Faça backup do banco e das artes privadas.
- Configure health check e logs centralizados.
- Valide com PostgreSQL real e `DEMO_DATA=false` antes de produção.
