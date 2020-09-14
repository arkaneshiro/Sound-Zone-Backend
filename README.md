# Soundzone
Soundzone is an application to host and play sounds

Frontend for Soundzone here: [Sound-Zone](https://github.com/arkaneshiro/Sound-Zone)

## Documentation links
- [Feature List](https://github.com/arkaneshiro/Sound-Zone/blob/master/Documentation/featureList.md)
- [Technologies](https://github.com/arkaneshiro/Sound-Zone/blob/master/Documentation/Technologies.md)
- [MVP](https://github.com/arkaneshiro/Sound-Zone/blob/master/Documentation/mvp.md)
- [Front End Routes](https://github.com/arkaneshiro/Sound-Zone/blob/master/Documentation/frontEndRoutes.md)
- [Back End Routes](https://github.com/arkaneshiro/Sound-Zone/blob/master/Documentation/backEndRoutes.md)
- [Schema Image](https://github.com/arkaneshiro/Sound-Zone/blob/master/Documentation/schema.png)

## Instructions to run locally
- clone repo
- run command "npm install"

- create database with some user, name, and password, enter appropriate info into .env file
- run command "npx dotenv sequelize-cli db:migrate" to migrate database
- run command "npx dotenv sequelize-cli db:seed:all" to seed database
- run command "npx dotenv sequelize-cli db:migrate:undo:all" to clear seeded data and un-migrate database

- run command "npm start" to start server
