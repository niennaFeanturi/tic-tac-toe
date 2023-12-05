source sess.sh
export GAME_ID=156eb430
curl -X POST ${BASE_URL}/games/${GAME_ID} \
  -H "Authorization: ${SECOND_ID_TOKEN}" \
  -H 'Content-Type: application/json' \
  -d '{
	"row": 1,
	"col": 1
}'
echo
curl -X POST ${BASE_URL}/games/${GAME_ID} \
  -H "Authorization: ${FIRST_ID_TOKEN}" \
  -H 'Content-Type: application/json' \
  -d '{
	"row": 2,
	"col": 0
}'
echo
curl -X POST ${BASE_URL}/games/${GAME_ID} \
  -H "Authorization: ${SECOND_ID_TOKEN}" \
  -H 'Content-Type: application/json' \
  -d '{
	"row": 2,
	"col": 2
}'
echo
curl -X POST ${BASE_URL}/games/${GAME_ID} \
  -H "Authorization: ${FIRST_ID_TOKEN}" \
  -H 'Content-Type: application/json' \
  -d '{
	"row": 0,
	"col": 1
}'
echo
curl -X POST ${BASE_URL}/games/${GAME_ID} \
  -H "Authorization: ${SECOND_ID_TOKEN}" \
  -H 'Content-Type: application/json' \
  -d '{
	"row": 0,
	"col": 0
}'
echo
curl -X POST ${BASE_URL}/games/${GAME_ID} \
  -H "Authorization: ${FIRST_ID_TOKEN}" \
  -H 'Content-Type: application/json' \
  -d '{
	"row": 0,
	"col": 2
}'
echo