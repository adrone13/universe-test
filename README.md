# Simple microservice test app
Application consists of multiple components:
* Signup
  * NodeJS service
  * PostgreSQL database
* Notifications
  * NodeJS service
* Prometheus monitoring
* SQS message queue


## Installation
### Prerequisites
* NodeJS 20.11.1 LTS
* Docker client
* Git

1. Create .env files in root, signup and notifications directories from provided .env.example files
2. Starting PostgreSQL, Localstack and Promethreus
```bash
$ cd universe-test
$ npm run start
```
3. Starting Signup service 
```bash
$ cd universe-test/signup
$ npm run start:dev
```
4. Starting Notifications service
```bash 
$ cd universe-test/notifications
$ npm run start:Dev
```



