curl --request POST \
  --url 'http://localhost:3005/users/login' \
  --header 'Content-Type: application/json' \
  --data '{
    "email": "invalid-email",
    "password": "securepassword"
  }'