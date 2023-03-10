# Frontend 

Frontend fullstack проекта. Это информационный сайт с функциями регистрации/авторизации пользователей и добавления/редактирования пользовательских статей и комментариев. Также есть функционал ленты пользователя и лайков статей.

> Мой первый целый Frontend и сразу на Vue. Код рабочий, но с заглушками и ошибоками.

**Скриншоты работы:** [Ссылка](https://photos.app.goo.gl/BVgcqkGDkQhntX439)

### Project setup
```
yarn install
```
### Compiles
```
yarn serve
```

# API

Часть API запросов. Для всех что работуают с данными пользоветеля необходим токен.
Headers: Token *****

## Post

/users/login
```
{
	"user": {
		"email": "string",
		"password": "string"
	}
}
```

/users
```
{
	"user": {
		"email": "string",
		"username": "string",
		"password": "string"
	}
}
```


/articles
```
{
	"articles": {
		"title": "string",
		"description": "string",
		"body": "string",
		"tagList": [string]
	}
}
```

/articles/*****/favorite

/profile/*****/favorite

/map/marker
```
{
	"marker": {
        "image": "url",
        "name": "string",
        "lat": number,
        "lng": number
	}
}
```


/region
```
{
	"region": {
        "intro": "url",
        "name": "string",
        "info": "string",
        "put": string",
        "lat": "number",
        "ing": "number",
        "map": "url",
        "reserves": ["string", "string"],
        "animal": ["string"]
	}
}
```

/map/polygon
```
{
	"polygon": {
        "paths": [number],
        "intro": "url",
        "map": "url",
        "name": "string",
        "info": "string"
	}
}
```

/reserve
```
{
	"reserve": {
        "intro": "url",
        "name": "string",
        "put": "string",
        "info": "string",
        "lat": "number",
        "lng": "number",
        "map": "url"
	}
}
```

/animal
```
{
	"animal": {
        "image": "url",
        "name": "string",
        "info": "string",
        "put": "string",
        "clas": [string]
	}
}
```

## Get

/user

/articles/*****

/articles

/profile/*****

/articles/feed

/region/*****

## Put

/user
```
{
	"user": {
		"bio": "string",
		"image": "url",
		"email": "string",
		"password": "string"
	}
}
```

/articles/*****
```
{
	"articles": {
		"title": "string",
		"description": "string",
		"body": "string",
		"tagList": ["string"]
	}
}
```

## Delete

/articles/*****

/articles/*****/favorite

/profile/*****/favorite
