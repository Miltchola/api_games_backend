curl --request POST \
  --url 'http://localhost:3005/users/register' \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "securepassword"
  }'