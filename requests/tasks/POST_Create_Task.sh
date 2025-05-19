curl --request POST \
  --url http://localhost:3005/tasks \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer " \
  --data '{
    "title": "Minha primeira tarefa",
    "description": "Criando tarefa autenticada"
  }'