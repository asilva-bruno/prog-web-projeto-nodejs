const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  // Listagem
  return response.json( repositories );
});

app.post("/repositories", (request, response) => {
  // TODO
  // Criação
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }
  
  repositories.push( repository );

  return response.json( repository );

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  // Atualização
  const { id } = request.params;
  const { title, url, techs } = request.body;

  // Procurar o index no repositório
  const findRepositoryIndex = repositories.findIndex( 
    repository => repository.id == id
   );

   if ( findRepositoryIndex == -1 ){
    return response.status( 400 ).json( {erro: 'Repositório inexistente!'} );
   }

   const repository = {
    id,
    title,
    url,
    techs,

    // Teste: não atualizar manualmente
    likes: repositories[ findRepositoryIndex ].likes
   };

   // Sobrescrever o valor com o novo objeto
   repositories[ findRepositoryIndex ] = repository;

   return response.json( repository );
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  // Remoção
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex( 
    repository => repository.id == id );

  if( findRepositoryIndex >= 0 ){
    repositories.splice( findRepositoryIndex, 1 )
  }
  else {
    return response.status( 400 ).json( {error: 'Repositório inexistente!'} );
  }
  
  return response.status( 204 ).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  // Criação de likes
  const {id} = request.params;

  const findRepositoryIndex = repositories.findIndex(
    repository => repository.id == id
  );

  if ( findRepositoryIndex == -1 ){
    return response.status( 400 ).json( {error: 'Repositório inexistente!'} ); 
  }
  
  repositories[ findRepositoryIndex ].likes += 1;

  return response.json( repositories[findRepositoryIndex] );
});

module.exports = app;
