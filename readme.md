# Installation
```bash 
npm init
```
```bash
npm install express@4.19.2
```
```bash
npm install -g nodemon
```
```bash
npm install cors@2.8.5 --save
```
```bash
npm install body-parser@1.20.0 --save
```
```bash
npm install prisma@5.13.0 --save-dev
```
# To Run Nodjes
```bash
nodemon index.js
```
# Install and Configuration Prisma
  ```npx
  npx prisma init
  ```
  Membuat Schema Table see file schema.prisma// disesuaikan dengan kebutuhan project
  ```bash
  npx prisma migrate dev --name posts
  ```
  Membuat Helper Prisma Client
  ```bash
  npm install @prisma/client@5.13.0
  ```
