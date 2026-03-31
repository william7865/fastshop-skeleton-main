# FastShop - Startup E-Commerce

Application e-commerce composee de 3 services :

- **Frontend** : React 19 + Vite + TypeScript
- **Backend** : Node.js + Express 5 + TypeScript
- **Base de donnees** : PostgreSQL

## Architecture

```
Frontend (React)  -->  Backend (Express API)  -->  PostgreSQL
   port 80                port 3000                 port 5432
```

## Structure du projet

```
frontend/          Application React (Vite + TypeScript)
backend/           API Express (TypeScript)
db/init.sql        Script d'initialisation de la base de donnees
```

## Demarrage en local (developpement)

### Pre-requis

- Node.js 20+
- PostgreSQL en local (ou via Docker)

### Base de donnees

Creer une base `fastshop` et executer le script `db/init.sql`.

### Backend

```bash
cd backend
cp .env.example .env    # adapter les valeurs si besoin
npm install
npm run dev
```

Le serveur demarre sur http://localhost:3000

### Frontend

```bash
cd frontend
npm install
npm run dev
```

L'application demarre sur http://localhost:5173 (proxy API configure vers le backend)

## Endpoints API

| Methode  | Route              | Description            |
|----------|--------------------|------------------------|
| GET      | /health            | Health check           |
| GET      | /api/products      | Liste des produits     |
| GET      | /api/products/:id  | Detail d'un produit    |
| GET      | /api/cart          | Contenu du panier      |
| POST     | /api/cart          | Ajouter au panier      |
| DELETE   | /api/cart/:id      | Retirer du panier      |
| DELETE   | /api/cart          | Vider le panier        |

## Demarrage avec Docker Compose

```bash
cp .env.example .env
docker compose up --build
```

Services exposes en local :

- Frontend : http://localhost:3000
- Backend : http://localhost:3001

Le frontend Nginx reverse-proxy automatiquement les routes `/api` et `/health` vers le backend, et renvoie `index.html` pour les routes React Router comme `/products` ou `/cart`.

## CI/CD GitHub Actions

Le workflow GitHub Actions est defini dans `.github/workflows/ci.yml`.

Declencheurs :

- `push` sur `main`
- `pull_request`

Comportement :

- build Docker des images `backend` et `frontend` sur chaque PR et push
- push sur Docker Hub uniquement pour les pushes sur `main`
- tags publies : `latest` et le SHA court du commit

Secrets GitHub a configurer :

- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`

Images publiees :

- `docker.io/<DOCKER_USERNAME>/fastshop-backend:latest`
- `docker.io/<DOCKER_USERNAME>/fastshop-backend:<sha>`
- `docker.io/<DOCKER_USERNAME>/fastshop-frontend:latest`
- `docker.io/<DOCKER_USERNAME>/fastshop-frontend:<sha>`
