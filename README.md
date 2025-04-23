배포용 커맨드(docker-compose.yml 기준)
```
docker-compose up -d --build
```

개발용 커맨드(docker-compose.dev 기준)
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```
: http://localhost:5173/
-- override 명칭으로 쓰면 자동 오버라이드 반영되기 때문에 dev로 분리