curl --request PATCH \
  --url http://localhost:3005/tasks/<TASK_ID_FROM_ANOTHER_USER> \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <VALID_TOKEN>' \
  --data '{
    "title": "Título atualizado"
  }'