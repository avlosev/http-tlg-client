# http-tlg-client

Для запуска приложения необходимо зарегистрировать свое API по адресу https://my.telegram.org/auth

1. git clone https://github.com/avlosev/http-tlg-client.git

2. cd http-tlg-client

3. npm install

4. Записать apiId, apiHash, name и phoneNumber в файл config.json

4. node .

После запуска, на телефон в котором устновлен telegram придет авторизационный код, который необходимо ввести. В последующем запуск будет производиться без запроса авторизации.

Для просмотра ID чатов можно использовать web интервейс для телеграмма https://fabianpastor.github.io/webogram/#/im

#Methods

GET /getChats - возвращает id всех чатов

POST /searchChatMembers - возвращает id всех пользователей чата. Не работает для супер групп
  body: json {"chat_id": "id need chat info"}
  
POST /getSupergroupMembers - возвращает id всех пользователей супер группы
  body: json {"supergroup_id": "id need super group info"}

POST /getUser - возвращает данные пользователя по id
  body: json {"user_id": "id need user info"}

POST /getChat - возвращает данные чата по id
  body: json {"chat_id": "id need chat info"}

POST /getBasicGroupFullInfo - возвращает полные данные чата по id
  body: json {"basic_group_id": "id need chat info"}

POST /getSupergroupFullInfo - возвращает полные данные супер группы по id
  body: json {"supergroup_id": "id need super group info"}
