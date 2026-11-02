https://www.baeldung.com/spring-boot-react-crud

## Создание нового frontend проекта:

Из корня проекта в контейнере запустить команду обновления зеркала (по какой-то причине доступ к центральному репозиторию бьёт по рукам из контейнера):

```bash
npm config set registry https://registry.npmmirror.com
```

Затем запускаем команду создания нового проекта

```bash
npx create-next-app@latest
```

И новый чистый frontend проект должен быть успешно создан в папке frontend.

## Что можно делать с проектом

Добавление нового элемента:

```
curl --location 'http://localhost:8080/clients' --header 'Content-Type: application/json' --data-raw '{"name": "John Doe", "email": "john.doe@baeldgung.com"}'
```

Посмотреть возвращаемые заголовки:

```
curl --location 'http://localhost:8080/clients' -i
```


