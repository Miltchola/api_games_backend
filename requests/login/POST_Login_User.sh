curl --request POST \
  --url 'http://localhost:3000/users/login' \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "newuser",
    "email": "user@email.com",
    "password": "securepassword"
    }'
