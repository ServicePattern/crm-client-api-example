
## Environment variables:
`BRIGHTPATTERN_ORIGIN`
- Is used as the origin to fetch `communicator/adapters/api.js`
- Default value for BRIGHTPATTERN_ORIGIN is 'https://localhost:3000'

## Setup and run
### Setup:
Compiles app in `/public` folder 

```bash
yarn install
BRIGHTPATTERN_ORIGIN='https://example.brightpattern.com' yarn build 
```

### Run
Starts the test page on `localhost:8080`
```bash
BRIGHTPATTERN_ORIGIN='https://example.brightpattern.com' yarn start
```


### Run with the watcher
Starts the test page on `localhost:8080` and auto-compile changed files.
```bash
yarn watch
BRIGHTPATTERN_ORIGIN='https://example.brightpattern.com' yarn start
```

## Standalone mode
You can switch between view with `Communicator app` and without by adding the `standalone` URL search query.

### Example:

#### API with Communicator app:
- `http://localhost:8080`

#### Standalone API (without Communicator app)
- `http://localhost:8080?standalone=true`
