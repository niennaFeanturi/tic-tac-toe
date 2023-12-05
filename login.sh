source env.sh

curl -X POST ${BASE_URL}/login \
  -H 'Content-Type: application/json' \
  -d '{
	"username": "myfirstuser",
	"password": "Password1"
}'
curl -X POST ${BASE_URL}/login \
  -H 'Content-Type: application/json' \
  -d '{
	"username": "theseconduser",
	"password": "Password1"
}'