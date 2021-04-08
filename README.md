
## Environment variables:
`BRIGHTPATTERN_ORIGIN`
- Is used as origin to fetch `communicator/adapters/api.js`
- Default value for BRIGHTPATTERN_ORIGIN is 'https://ocean08.brightpattern.com'

## Setup and run
### Setup:
Compiles app in `/public` folder 

```bash
yarn install
BRIGHTPATTERN_ORIGIN='https://example.brightpattern.com' yarn build 
```

### Run
Starts the test page on localhost:8080
```bash
BRIGHTPATTERN_ORIGIN='https://example.brightpattern.com' yarn start
```


### Run with watcher
Starts the test page on localhost:8080 and autocompile changed files.
```bash
yarn watch
BRIGHTPATTERN_ORIGIN='https://example.brightpattern.com' yarn start
```

## Standalone mode
You can switch between view with communicator app and without by adding `standalone` URL search query.

### Example:

#### API with communicator app:
- `http://localhost:8000`

#### Standalone API (without Communicator app)
- `http//localhost:8000?standalone=true`