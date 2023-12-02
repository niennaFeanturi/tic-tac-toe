curl -X POST ${BASE_URL}/games \
 -H 'Content-Type: application/json' \
  -H "Authorization: ${FIRST_ID_TOKEN}" \
  -d '{
	"opponent": "theseconduser"
}'