# Frontend 

Frontend fullstack проекта. Это информационный сайт с функциями регистрации/авторизации пользователя и добавления/редактирования пользовательских статей.

> Это мой первый целый Frontend и сразу на Vue. Это рабочий код недоделанного проекта с ошибоками.

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
		"bio": "string"
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
