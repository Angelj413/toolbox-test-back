
![Logo](https://media.licdn.com/dms/image/C4D0BAQHgpzIdFSF3LQ/company-logo_200_200/0/1669911798947?e=2147483647&v=beta&t=C6w3bpSchBArbbETeBSqcnMptHyWo6OnWI3knNex7E0)


# Toolbox Test Backend Server

This server is to fulfill the objective of the test requested in the selection process for the toolbox


## Tech Stack

**Server:** Node, Express

**Unit Testing:** Mocha, Chai

**Others:** Axios, date-fns, winston, express-validator


## Run Locally

Clone the project

```bash
  git clone https://github.com/Angelj413/toolbox-test-back.git 
```

Go to the project directory

```bash
  cd toolbox-test-back
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## API Reference

#### Get all items
Get all files with parsed data. Or pass query param fileName to get one file data filtered by name

```http
  GET /files/data
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fileName` | `string` | **Optional**. file name to filter |

#### Get list
Get a list of file data unparsed, exactly like External API

```http
  GET /files/list
```

#### Get names
Get a list with all files names avaiable

```http
  GET /files/names
```


## Documentation

[Documentation /docs](http://localhost/docs)


## Acknowledgements

 - [Toolbox](https://www.toolboxtve.com/)


## Authors

- [Angel Morante](https://github.com/Angelj413)


## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/angel-jes%C3%BAs-morante-3a815b125/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/Amorante413)


## License

[MIT](https://choosealicense.com/licenses/mit/)

