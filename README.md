# 🗓️ Nympla

Um projeto desenvolvido como parte da disciplina de Programação Web II, que consiste em um sistema para gerenciamento de eventos e inscrições de usuários. Usuários podem se cadastrar, fazer login, visualizar eventos disponíveis, se inscrever em eventos e visualizar seu histórico de inscrições. Administradores pode gerenciar os eventos, além de visualizar todos os inscritos.

## 📋 Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Usar](#como-usar)
- [Endpoints da API](#endpoints-da-api)
- [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
- [Como Executar o Projeto Localmente](#como-executar-o-projeto-localmente)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## 📌 Descrição do Projeto

**Nympla** é um sistema web completo dividido em frontend e backend. O backend, construído em Node.js e Express, fornece uma API RESTful para gestão de usuários, autenticação, eventos e inscrições. O frontend, desenvolvido em HTML, CSS e JavaScript puro, permite interação intuitiva com a API, apresentando páginas de cadastro, login, listagem de eventos e painel de administração.

## 🫡 Funcionalidades

- **Cadastro de Usuário**: registro com nome, email, senha e data de nascimento.
- **Autenticação**: login com JSON Web Tokens (JWT) e roles (user/admin).
- **Listagem de Eventos**: exibir todos os eventos disponíveis.
- **Inscrições em Eventos**: usuários podem se inscrever e cancelar inscrição.
- **Gestão de Eventos (Admin)**: remover eventos.
- **Visualização de Inscritos (Admin)**: ver todos os usuários inscritos em cada evento.

## 🔧 Tecnologias Utilizadas

- **Frontend**:
  - HTML5, CSS3, JavaScript
- **Backend**:
  - Node.js
  - Express
  - PostgreSQL
- **APIs**:
  - Endpoints RESTful para gerenciamento de eventos, usuários e inscrições.

## 💪 Como Usar

1. Acesse a página de cadastro no navegador (/frontend/pages/register.html).
2. Realize o cadastro de um novo usuário inserindo as informações e clicando na opção "Cadastrar".
3. Faça login com as credenciais criadas.
4. Na pagina inicial, visualize a lista de eventos e inscreva-se nos que desejar.
5. Acesse suas incrições para acompanhar os eventos em que está inscrito.
6. Caso tenha um usuário administrador:
    - Faça login e acesse o painel administrativo.
    - Exclua algum evento que desejar.
    - Visualize todos os inscritos em cada evento.

## 🌐 Endpoints da API

### `Usuários`

```javascript
GET /user/all - Retorna todos os usuários.
```
 ```javascript
POST /user/register - Registra um novo usuário.
```
```javascript
POST /user/login - Autentica suas credênciais.
```

### `Autenticação`

```javascript
POST /auth/profile - Apenas mostra se o usuário está autenticado. (role user).
```
```javascript
POST /auth/dashboard - Apenas mostra se o usuário está autenticado. (role admin).
```

### `Eventos`

```javascript
GET /events/all - Lista todos os eventos.
```
```javascript
POST /events/insert - Cria um evento (admin).
```
```javascript
PUT /events/update - Atualiza um evento (admin).
```
```javascript
DELETE /events/delete/:id - Remove um evento pelo seu ID (admin).
```

### `Inscrições`

```javascript
GET /subscription/all - Lista todas as inscrições.
```
```javascript
GET /subscription/find/:user_id - Busca inscrições de um usuário (user).
```
```javascript
GET /subscription/registered/:event_id - Lista usuários inscritos em um evento (admin).
```
```javascript
POST /subscription/create - Cria uma nova inscrição (user).
```
```javascript
DELETE /subscription/delete/:id - Cancela inscrição pelo seu ID (user).
```

## 📸 Screenshots Desktop - (Clique nas imagens para amplia-las)

<div class="desktop">
  <img src="" alt="" width="750"/>
  <img src="" alt="" width="750"/>
  <img src="" alt="M" width="750"/>
</div>

## 🗄️ Estrutura do Banco de Dados

### Tabelas

#### 1. **Tabela `users`**

Armazena todos os usuários cadastrados no sistema.

```sql
create table users(
	id serial primary key,
	name varchar,
	email varchar unique,
	password varchar,
	dob date,
	role varchar
)
```

**Colunas:**

- `id`: Identificador único auto incrementável.
- `name`: Nome do usuário.
- `email`: Email informado pelo usuário, único para evitar usuários duplicados, utilizado para realizar o login.
- `password`: Senha criada pelo usuário, utilizada para realizar o login.
- `dob`: Data de nascimento do usuário.
- `role`: Cargo do usuário, que por padrão é atribuido a "user" no backend.

#### 2. **Tabela `events`**

Armazena os eventos disponíveis e todos os seus detalhes.

```sql
create table events(
	id serial primary key,
	title varchar,
	date timestamp,
	description varchar,
	image_url varchar
)
```

**Colunas:**

- `id`: Identificador único auto incrementável.
- `title`: Título do evento.
- `date`: Data em que o evento ocorrerá.
- `description`: Breve descrição do evento.
- `image_url`: Caminho de uma imagem do evento, para ser apresentada no frontend.

#### 3. **Tabela `subscriptions`**

Registra as vendas realizadas.

```sql
create extension if not exists "uuid-ossp"

create table subscriptions (
	id uuid primary key default uuid_generate_v4(),
	user_id int not null,
	event_id int not null,
	check_in varchar default 'pending',
	foreign key (user_id) references users(id) on delete cascade,
	foreign key (event_id) references events(id) on delete cascade,
	unique(user_id, event_id)
)
```

**Colunas:**

- `id`: Identificador único da inscrição.
- `user_id`: Chave estrangeira que referencia o usuário que fez a inscrição.
- `event_id`: Chave estrangeira que referencia o evento em que a inscrição está sendo realizada.
- `check_in`: Status de presença, mostra se o usuário compareceu ou não ao evento.

## 💽 Como Executar o Projeto Localmente

### Pré-requisitos

- Node.js v16+
- PostgreSQL
- (Opcional) Extensão Live Server ou http-server para servir o frontend

##

1. Clone este repositório:
   ```bash
   git clone https://github.com/GustavoDeltta/ads-progweb-nympla.git
   ```
2. Configure o banco de dados PostgreSQL:
   - Crie um banco Nympla.
   - Crie um arquivo .env na pasta **backend** com as seguintes variáveis:
   ```bash
    POSTGRES_URL="postgresql://<usuário>:<senha>@localhost:5432/Nympla"
    NODE_ENV=development
    SECRET_KEY="<sua_chave_secreta>"
   ```
3. Instale as dependências e inicie o backend:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. Inicie o frontend abrindo o arquivo `loign.html` em um navegador.

## 🖇️ Contribuição

Contribuições são bem-vindas! Se você deseja colaborar com este projeto:

1. Fork este repositório.
2. Crie uma nova branch (`git checkout -b feature/nome-da-feature`).
3. Realize suas alterações e faça commit (`git commit -m "Descrição da feature"`).
4. Envie a branch para o repositório remoto (`git push origin feature/nome-da-feature`).
5. Abra um Pull Request.

## 📄 Licença

Este projeto não possui uma licença definida. Sinta-se livre para utilizar e modificar o código conforme necessário.

## 📩 Contato

Para dúvidas ou sugestões, entre em contato:

- **Nome**: Gustavo Sousa
- **Email**: [deltta.dev@gmail.com](deltta.dev@gmail.com)
- **LinkedIn**: [Perfil no LinkedIn](https://www.linkedin.com/in/gustavodeltta/)
