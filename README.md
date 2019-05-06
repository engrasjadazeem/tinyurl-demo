# tinyurl-demo

Sample App using local pgsql docker instance with its own api and ui

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
nodejs
Docker
npm
```

### Installing

First of tinyurl-db project has to be build, got to tinyurl-db and write

```
docker-compose up --build
```

This will run a local instance of postgresql running in docker container that will be used to save our url models

Then go to tinyurl-api folder, install node packages and start api 

```
npm install
npm run start
```

Finally go to tinyurl-ui folder, install node packages and start UI

```
npm install
npm run dev
```

Now when everything is running, UI is accessible through http://localhost:3001

## Running the tests

Tests are for api right now, go to tinyurl-api and run

```
npm run test
```

## Built With

* [nodejs](http://www.dropwizard.io/1.0.2/docs/) - To create backend
* [docker](https://maven.apache.org/) - To run independent containers
* [nuxt](https://rometools.github.io/rome/) - To work fast with vuejs

## Authors

* **Asjad Azeem** - (https://github.com/engrasjadazeem)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
