curl --request PATCH \
  --url http://localhost:3005/tasks/$TASK_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: $TOKEN" \
  --data '{
    "completed": true
  }'