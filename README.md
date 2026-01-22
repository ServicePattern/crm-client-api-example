
## Setup and run
### Setup:
Compiles app in `/public` folder 

```bash
yarn
yarn build 
```

### Run with the watcher
Starts the test page on `localhost:5173` and auto-compile changed files.
```bash
yarn
yarn dev
```

## Options

### Configure Bright Pattern instance domain
You need to provider `bpatternDomain` URL parameter to provide domain of your instance (tenant URL).

### No Comm.Widget UI

You can switch between view with `Communicator app` and without by adding the `standalone` URL search query.

### Disable new interaction popup

In order to disable new interaction popup from Agent Helper application, you need to add `no-popup` to the URL string.

## Example:

#### API with Communicator app:
- `http://localhost:5173?bpatternDomain=example.brightpattern.com`

#### Standalone API (without Communicator app)
- `http://localhost:5173?bpatternDomain=example.brightpattern.com&standalone=true`

#### Disabled popup
- `http://localhost:5173?bpatternDomain=example.brightpattern.com&no-popup=true`

### Standalone + disabled popup
- `http://localhost:5173?bpatternDomain=example.brightpattern.com&standalone=true&no-popup=true`
