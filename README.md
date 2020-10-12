

# Как задеплоить решение (Ubuntu)
## Если лень деплоить, я сделал это за Вас: http://104.248.171.0:3000/. 

## Устанавливаем Docker

* Первым делом обновите существующий список пакетов:   
`$ sudo apt update`  

* Затем установите несколько необходимых пакетов, которые позволяют apt использовать пакеты через HTTPS:    
`$ sudo apt install apt-transport-https ca-certificates curl software-properties-common`

* Добавьте ключ GPG для официального репозитория Docker в вашу систему:   
`$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`

* Добавьте репозиторий Docker в источники APT:   
`$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"`

* Потом обновите базу данных пакетов и добавьте в нее пакеты Docker из недавно добавленного репозитория:  
`$ sudo apt update`

* Убедитесь, что установка будет выполняться из репозитория Docker, а не из репозитория Ubuntu по умолчанию:  
`$ apt-cache policy docker-ce`

* Вы должны получить следующий вывод, хотя номер версии Docker может отличаться:   
```
$ docker-ce:
    Installed: (none)
    Candidate: 5:19.03.9~3-0~ubuntu-focal
    Version table:
       5:19.03.9~3-0~ubuntu-focal 500
          500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
 ```
 Обратите внимание, что docker-ce не установлен, но является кандидатом на установку из репозитория Docker для Ubuntu 20.04 (версия focal).

*  Установите Docker:
`$ sudo apt install docker-ce`

* Docker должен быть установлен, демон-процесс запущен, а для процесса активирован запуск при загрузке. Проверьте, что он запущен:
`$ sudo systemctl status docker`

* Вывод должен выглядеть примерно следующим образом, указывая, что служба активна и запущена: 
```
$ docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2020-05-19 17:00:41 UTC; 17s ago
TriggeredBy: docker.socket
       Docs: https://docs.docker.com
   Main PID: 24321 (dockerd)
      Tasks: 8
     Memory: 46.4M
     CGroup: /system.slice/docker.service
             └─24321 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
```

    
### Разрешаем не root пользователю использовать Docker (опционально)
* Добавляем своего пользователя в группу docker:   
`$ sudo usermod -aG docker username`   
   
   
   
   
## Устанавливаем Docker-compose
* Запускаем эту команду для установки последней версии docker-compose:  
```
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

* Делаем файл запускаемым: `$ sudo chmod +x /usr/local/bin/docker-compose`

* Проверяем, как все работает: `$ docker-compose --version`

* Вывод должен быть примерно таким: 
```
$ docker-compose version 1.26.0, build 8a1c60f6
```

## Запускаем решение
* Заходим в корневую папку проекта:  
```
$ cd doubletapp_test-task
```

* Собираем образы будущих контейнеров Docker:
```
$ docker-compose build
```

* Вывод будет начинаться примерно так:
```
$ mongo uses an image, skipping
Building frontend
Step 1/7 : FROM node:alpine
alpine: Pulling from library/node
cbdbe7a5bc2a: Pull complete
15f7fe915f93: Pull complete
3cae4fa026a7: Pull complete
bfa729779926: Pull complete
Digest: sha256:a016fdfb6001b49c6d99a662eddf79de2e382814ed1e04b0c5e113587d8a6aec
Status: Downloaded newer image for node:alpine
 ---> 0f2c18cef5d3
Step 2/7 : WORKDIR /usr/app
 ---> Running in 92edc8b33c56
Removing intermediate container 92edc8b33c56
 ---> 552de1198656
 ...
```
 
 А закончится вот так:
```
 ...
 Successfully built b1926c806428
 Successfully tagged doubletapp_test-task_backend:latest
```

* Далее мы запускаем контейнеры из только что собранных образов: 
```
$ docker-compose up
```

* Вывод начнется с этого: 
```
$ Creating network "doubletapp_test-task_default" with the default driver
Pulling mongo (mongo:bionic)...
bionic: Pulling from library/mongo
7595c8c21622: Pull complete
d13af8ca898f: Pull complete
70799171ddba: Pull complete
b6c12202c5ef: Pull complete
f8718c532d71: Pull complete
9035443a91bc: Pull complete
93ca553166d9: Pull complete
bc866a5c284c: Pull complete
6faca936e7b3: Pull complete
1dc2a767b81f: Pull complete
56dee77e3145: Pull complete
b967fd908de0: Pull complete
7cd9ac470a46: Pull complete
Digest: sha256:ef8e2c9bba964ee8b021e2e0afe658daf227538809a6625fd23f20a87ee6fe0e
Status: Downloaded newer image for mongo:bionic
Creating mongo_container                 ... done
Creating doubletapp_test-task_frontend_1 ... done
Creating doubletapp_test-task_backend_1  ... done
```

* Ожидаем до появления этих строк и заходим на любой из предложенных адресов: 
```
$ Compiled successfully!
frontend_1  | 
frontend_1  | You can now view doubletapp in the browser.
frontend_1  | 
frontend_1  |   Local:            http://localhost:3000
frontend_1  |   On Your Network:  http://172.18.0.3:3000
frontend_1  | 
frontend_1  | Note that the development build is not optimized.
frontend_1  | To create a production build, use npm run build.
frontend_1  | 
```

## Останавливаем проект 
* Для того, чтобы остановить работу проекта необходимо: либо приостановить выполнение сочетанием клавиш `ctrl + c` или `ctrl + z`, а после написать `docker-compose down`, либо написать это в другом окне терминала, но для этого необходимо выполнять команду из места от куда вы запустили контейнеры.

## Удаление образов
* Если вы не собираетесь в дальнейшем пользоваться проектом, то образы стоит удалить, так как весят они не мало:
```
$ docker rmi doubletapp_test-task_backend \
&& docker rmi doubletapp_test-task_frontend \
&& docker rmi $(docker images -f dangling=true -q)
```

* Если вы хотите удалить ВСЕ образы и контейнеры с вашего компьютера, в том числе и не связанных с проектом, то можно воспользоваться командой:
```
$ docker system prune -a
```

# API   

## Get student  
#### URL: `/get/`  
#### METHOD: `GET`  
#### RESPONSE EXAMPLE:
```json
[
  {
    "_id": "5f360247b136e2994b065fc3",
    "avatar": "uploads/bfc59d7ec0edec0ddb59cb7eeee83591",
    "fullname": "Иванов Иван Иванович",
    "email": "ivanov@ivan.com",
    "age": "20",
    "rating": "127",
    "specialty": "Математика",
    "group": "МТ-102",
    "color": "#83C872",
    "sex": "Мужской"
  }
]
```

## Add student
#### URL: `/send/`  
#### METHOD: `POST`
#### RESPONSE STATUS: `201`

## Delete student 
#### URL: `/detele/:id/:avatarname/`
#### URL Parameters: `:id` - id студента, `:avatarname` - название файла с аватаром студента
#### METHOD: `DELETE`
#### RESPONSE STATUS: `200`
