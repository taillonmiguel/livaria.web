# Livraria Web 📚

Aplicação **React + Next.js 14** construída em **TypeScript**, estilizada com **Tailwind CSS** e organizada com **Zustand** para gerenciamento de estado.  
O front-end consome a API REST do backend **Livraria.Api** (.NET 8) publicada em **http://localhost:5124** e permite _CRUD_ completo de **Livro, Autor e Gênero**.

---

## 🎯 Pré-requisitos

| Ferramenta | Versão recomendada | Observações |
|------------|-------------------|-------------|
| **Node.js**| ≥ 18 LTS (testado em 20.x) | Next.js 14 aproveita recursos do Node ≥ 18 |
| **pnpm**   | ≥ 8               | Instale com `npm i -g pnpm` (ou use npm/yarn se preferir) |
| **Git**    | Qualquer recente  | Para clonar o repositório |
| **Backend**| API rodando em **http://localhost:5124** | Veja o README do repo `Livraria.Api` |

---

## 🚀 Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/taillonmiguel/livaria.web.git
cd livaria.web

# 2. Instale as dependências
pnpm install        # ou npm install / yarn

# 3. Configure variáveis de ambiente
cp .env.example .env.local
# Edite .env.local se precisar alterar a URL da API

# 4. Inicie o servidor de desenvolvimento Next.js
pnpm dev            # ou npm run dev / yarn dev
# Acesse http://localhost:3000
