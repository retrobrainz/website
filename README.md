# RetroBrainz Website

## Deployment

### Prepare openSUSE/SLE server

[Setup_openSUSE_VPS](https://en.opensuse.org/Setup_openSUSE_VPS)

### Initialize PostgresQL

```bash
sudo su postgres
psql
```

```sql
CREATE USER retrobrainz WITH PASSWORD 'your_password_here';
CREATE DATABASE your_user;
GRANT ALL PRIVILEGES ON DATABASE retrobrainz TO your_user;
\c EXAMPLE_DB postgres
GRANT ALL ON SCHEMA public TO EXAMPLE_USER;
exit
```

### Install packages

```bash
# openSUSE/SLE
sudo zypper install git nodejs postgresql postgresql-server postgresql-contrib nginx python3-certbot python3-certbot-nginx
```

### Clone repository and build

```bash
cd /srv/www
git clone https://github.com/retrobrainz/website.git
cd website
npm install
npm run build
```

### PM2 setup

```bash
sudo npm install -g pm2
pm2 start ecosystem.config.cjs
pm2 startup
pm2 save
```

## Acknowledge

RetroBrainz Website is built using the following free & open source technologies:

- [Git](https://git-scm.com/) as the version control system.
- [Node.js](https://nodejs.org/) as the runtime environment.
- [TypeScript](https://www.typescriptlang.org/) as the programming language.
- [AdonisJS](https://adonisjs.com/) as the backend framework.
- [Vite](https://vitejs.dev/) as the frontend build tool.
- [React](https://reactjs.org/) as the frontend framework.
- [Ant Design](https://ant.design/) as the UI component library.
- [Wouter](https://github.com/molefrog/wouter) as the routing library.
- [PostgreSQL](https://www.postgresql.org/) as the database.
- [PM2](https://pm2.keymetrics.io/) as the process manager.
- [Nginx](https://www.nginx.com/) as the web server.
- [Certbot](https://certbot.eff.org/) as the SSL certificate manager.
