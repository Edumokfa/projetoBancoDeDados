<<<<<<< HEAD
=======
# trippler

Build do docker: <br>
`docker build -t shaianeboesing/trippler .`

Run npm install: <br>
`npm install`

Levantar aplicação: <br>
`docker-compose up`

Acessar bash em outra janela do terminal: <br>
`docker exec -it trippler-app-1  bash`

Rodar ddl e seed dentro do bash <br>
``` 
node database/migrate.js ./database/scripts/ddl.sql
node database/migrate.js ./database/scripts/seed.sql
```
>>>>>>> 88f0fa74d8da2fd2edddf5e49725e1c954dcae3a
