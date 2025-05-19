curl --request PATCH \
  --url http://localhost:3005/tasks/<TASK_ID> \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer INVALID_TOKEN' \
  --data '{
    "title": "Título atualizado"
  }'