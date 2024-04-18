# Allintra Service, Variable and Package Management

Manage your services, packages, and variables seamlessly with Allintra's powerful management platform.

## Base URL

- **Base URL:** [https://api.dev.allintra.app](https://api.dev.allintra.app)

## Integration

Integrated with Bitbucket via OAuth2 for seamless collaboration and version control.

## Endpoints

---

## Permissions

Control access and actions using permissions.

- **Method:** GET
- **Endpoint:** `/permission`
- **Response:**
  ```json
  {
    "service": {
      "create": false,
      "delete": false,
      "edit": false
    },
    "variables": {
      "create": false,
      "delete": false,
      "edit": false
    },
    "packages": {
      "create": false,
      "delete": false
    },
    "UserAuthorized": false
  }
  ```

## Automatic Service Update

Automatically update the list of services using polling.

- **Technology:** Polling
- **Implementation:** Regularly poll the `/services` endpoint at specified intervals to retrieve the latest list of services.

  Example using JavaScript:

  ```javascript
  function fetchServices() {
    fetch('https://api.dev.allintra.app/services')
      .then((response) => response.json())
      .then((data) => {
        // Process the retrieved data
        console.log('Services:', data.services)
      })
      .catch((error) => {
        console.error('Error fetching services:', error)
      })
  }

  // Fetch services every 5 minutes
  setInterval(fetchServices, 5 * 60 * 1000)
  ```

### Get Services

Retrieve information about available services.

- **Method:** GET
- **Endpoint:** `/services`
- **Response:**
  ```json
  {
    "services": [
      {
        "name": "servico-de-notificao/v1",
        "aproducao": ["versao", "true online, false indisponivel", "alertas"],
        "abeta": ["versao", "true online, false indisponivel", "alertas"],
        "database": true,
        "api": true,
        "variables": ["numero variaveis de ambiente", "alertas"]
      }
    ]
  }
  ```

### Create Service

Create a new service.

- **Method:** POST
- **Endpoint:** `/service`
- **Request:**
  ```json
  {
    "name": "nome do servico",
    "database": true,
    "api": true,
    "variables": [
      {
        "name": "nome da variavel 1",
        "aprodvalue": "valor em producao",
        "abetavalue": "valor em beta"
      },
      {
        "name": "nome da variavel 2",
        "aprodvalue": "valor em producao",
        "abetavalue": "valor em beta"
      }
    ]
  }
  ```

### Get Packages

Retrieve information about available packages.

- **Method:** GET
- **Endpoint:** `/packages`
- **Response:**
  ```json
  {
    "packages": [
      {
        "name": "nome do pacote",
        "version": "1.2.3-beta",
        "links": [
          {
            "version": "versao do pacote",
            "link": "link para esta versao"
          }
        ]
      }
    ]
  }
  ```

### Create Package

Create a new package.

- **Method:** POST
- **Endpoint:** `/package`
- **Request:**
  ```json
  {
    "nome": "nome do pacote enviar sem o @allintra/"
  }
  ```

### Get Service Variables

Retrieve variables associated with a specific service.

- **Method:** GET
- **Endpoint:** `/service/[nome do servico]/variables`
- **Response:**
  ```json
  {
    "variables": [
      {
        "name": "Nome da variavel",
        "alerts": ["alerta 1", "alerta 2", "..."]
      }
    ]
  }
  ```

### Create Service Variables

Create variables associated with a specific service.

- **Method:** POST
- **Endpoint:** `/service/[nome do servico]/variables`
- **Request:**
  ```json
  {
    "variables": [
      {
        "name": "nome da variavel 1",
        "aprodvalue": "valor em producao",
        "abetavalue": "valor em beta"
      },
      {
        "name": "nome da variavel 2",
        "aprodvalue": "valor em producao",
        "abetavalue": "valor em beta"
      }
    ]
  }
  ```
