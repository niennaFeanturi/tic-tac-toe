export FIRST_ID_TOKEN=eyJraWQiOiJncTM5TW4zOTZZbUtwMUZwQ0hGK0dpTlFxSnlLRnJRcGlYWHNZUGt6VjR3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxN2NiYTAwZi1kYmE5LTQ4NDQtODUzNS1jZDQ0Y2IwMzc4MmQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfOG9JQWVCV2NBIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6Im15Zmlyc3R1c2VyIiwib3JpZ2luX2p0aSI6IjU5Mzg1Y2FmLWJjMmItNGVjMC1hYjJhLWYyZTEwZGRlMzEyMSIsImF1ZCI6IjUwanFibms1dHRkZzM5YWoxaXFvMWxsMGVvIiwiZXZlbnRfaWQiOiIxMTkyNDE0OS1lZDliLTRjZTAtOWI4Ni0xMjk4MGVlZjVlZTAiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcwMTU0NjU1NSwicGhvbmVfbnVtYmVyIjoiKzE1NTU0NDQzMzIyIiwiZXhwIjoxNzAxNTUwMTU1LCJpYXQiOjE3MDE1NDY1NTUsImp0aSI6IjFjZmIwNDA5LWVmMjAtNDhhZS05MWVjLWRkOTIwYmI0YTY4MSIsImVtYWlsIjoiYW5hbG9nLnRudEBnbWFpbC5jb20ifQ.ACoaviGFtk4Pb3m6yeXJIPcaSftIOmHJqx6LU4TWjLaq7JJNeZyqXC-sQ9lhOPaqHrw95Akc2mqBo6kpUdSf3HSQIQ5lq-Ma5_8-pL3Mbqh-xkqmkWdqvBAhxQz-INU7FSKtwqIZQSAqzRRTwLf8hXQlZfF0P1oemOI-a2dJHub7yGZOskPYd8-Xzh5nx7Xfsuy20YOCsHBNUDHF08IdRdlrZO1aiKXjQcFK6q59G-O0PR11iNHnNNWVz4ABz2gbOWjUgxSDVxk7cjuT2cEZtHQVAMSqP4DBNtF2IMGmDLVzeXMNty2CVHjU_wc8dBjwDb6SkextRejEWddYVFrJnA
export SECOND_ID_TOKEN=eyJraWQiOiJncTM5TW4zOTZZbUtwMUZwQ0hGK0dpTlFxSnlLRnJRcGlYWHNZUGt6VjR3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4Yjk1NzhiYS1hMTgyLTQ3NjAtOWFmMy01M2E0ODYxZWY0ZDUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfOG9JQWVCV2NBIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6InRoZXNlY29uZHVzZXIiLCJvcmlnaW5fanRpIjoiYjkxMGJkN2QtN2UxNi00MDg1LTkyYjMtNzFmYjhlNWEwZmRjIiwiYXVkIjoiNTBqcWJuazV0dGRnMzlhajFpcW8xbGwwZW8iLCJldmVudF9pZCI6IjhlZWQ4OTI0LTA5YTctNDYzNy04MGI5LTg0NjNmNTljNjk2ZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzAxNTQ2NTgzLCJwaG9uZV9udW1iZXIiOiIrMTU1NTQ0NDMzMjIiLCJleHAiOjE3MDE1NTAxODMsImlhdCI6MTcwMTU0NjU4MywianRpIjoiNjgyM2U1NzAtYTJhNC00ZTM0LWEzMmYtZTMyMDA0MTk0YjJiIiwiZW1haWwiOiJpcnVkZW5rQGdtYWlsLmNvbSJ9.wgVVAZtVxLyPp4rDOntrDYh03O9bO1bTWyMaqL8Jbie2HjYaKF6Ii0q7wCgTU2IQb5ojevVrGho7wvP8EUavYk6rFrxs-ZquNdGDjBUWdQiHjKFnzavzmtT-y6Mp7SjFRsjg8waYbxWuCGuf9MOnR6fOPYjn2lE6SRMXtpS91Eso5UoTdZGH3Jy9E1ooT3J7FoE7MqBsfAaNFvhwY_wQsFq4HLpUPDp7G5q36-ibiAw3wOhwYtuFgSjEuG367Sgnukum_VvE-bu0MFQUBh1eD1HMA4TzKtspUu1kEbNTAmLio2m-41IN4AmfmfgBFWQ1Rgs6hmBCpVhWadB7eTSs5A
export GAME_ID=84c6ce27
curl -X POST ${BASE_URL}/games/${GAME_ID} \
  -H "Authorization: ${SECOND_ID_TOKEN}" \
  -H 'Content-Type: application/json' \
  -d '{
	"row": 1,
	"col": 1
}'
curl -X POST ${BASE_URL}/games/${GAME_ID} \
  -H "Authorization: ${FIRST_ID_TOKEN}" \
  -H 'Content-Type: application/json' \
  -d '{
	"row": 2,
	"col": 0
}'

curl -X POST ${BASE_URL}/games/${GAME_ID} \
  -H "Authorization: ${SECOND_ID_TOKEN}" \
  -H 'Content-Type: application/json' \
  -d '{
	"row": 2,
	"col": 2
}'
curl -X POST ${BASE_URL}/games/${GAME_ID} \
  -H "Authorization: ${FIRST_ID_TOKEN}" \
  -H 'Content-Type: application/json' \
  -d '{
	"row": 0,
	"col": 1
}'
curl -X POST ${BASE_URL}/games/${GAME_ID} \
  -H "Authorization: ${SECOND_ID_TOKEN}" \
  -H 'Content-Type: application/json' \
  -d '{
	"row": 2,
	"col": 2
}'
curl -X POST ${BASE_URL}/games/${GAME_ID} \
  -H "Authorization: ${FIRST_ID_TOKEN}" \
  -H 'Content-Type: application/json' \
  -d '{
	"row": 0,
	"col": 2
}'