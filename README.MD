https://www.baeldung.com/spring-boot-react-crud

Сначала запускаем докер из `frontend/init`. Заходим внутрь запущеного контейнера
и запускаем

```npx create-react-app```

Затем сформированный проект перекладываем в папку ``frontend`` с изменением атрибутов файлов

Добавление нового элемента:

```
curl --location 'http://localhost:8080/clients' --header 'Content-Type: application/json' --data-raw '{"name": "John Doe", "email": "john.doe@baeldgung.com"}'
```

Посмотреть возвращаемые заголовки:

```
curl --location 'http://localhost:8080/clients' -i
```


