# http-tlg-client

Для запуска приложения необходимо зарегистрировать свое API по адресу https://my.telegram.org/auth

1. git clone https://github.com/avlosev/http-tlg-client.git

2. cd http-tlg-client

3. npm install

4. Записать apiId, apiHash, name и phoneNumber в файл config.json

4. node .

# После запуска, на телефон в котором устновлен telegram придет авторизационный код, который необходимо ввести. В последующем запуск будет производиться без запроса авторизации.
