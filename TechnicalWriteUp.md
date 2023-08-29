# Client App

Consumer platform React app.

This React app was bootstrapped from [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate) version [3.7.0](https://github.com/react-boilerplate/react-boilerplate/pull/2403/files). Upgrading to future versions of React Boilerplate will be a manual process.

Please refer to [The Hitchhikers Guide to react-boilerplate](https://github.com/react-boilerplate/react-boilerplate/blob/master/docs/general/introduction.md) for a more detailed documentation on how this project is structured.

## Scripts

* start -- This has to be run together with the local ASPNET CORE side and access from the ASPNET CORE url (e.g http://localhost:64169/ - port is randomly assigned). ASPNET CORE will proxy the SPA to http://localhost:3000.
* start:mock -- Runs this project at [http://localhost:3000](http://localhost:3000) with a Stubs API at [http://localhost:7777] for UI development. (No need ASPNET CORE)
* start:https -- Same like 'start:mock' but also make it avaiable in HTTPS via NGROK. Do this if you want to hit the actual LocationService API in DEV as it requires HTTPS (has to update Stubs API)
* lint -- Run lint:eslint first then lint:stylelint and lint:stylelint:styled.
* lint:stylelint -- Run Stylelint on all `*.css` and `*.less` files excluding the directories defined in `stylelintCSS.json`.
* lint:stylelint:fix -- Run Stylelint fixes on all `*.css` and `*.less` files excluding the directories defined in `stylelintCSS.json`.
* lint:stylelint:styled -- Run Stylelint Styled Components on all `*.js` and `*.jsx` files in the `app` directory.
* lint:stylelint:styled:fixes -- Run Stylelint Styled Components fixes on all `*.js` and `*.jsx` files in the `app` directory.
* lint:eslint -- Run ESLint on all `*.js` and `*.jsx` files excluding the directories and files defined in `.prettierrc`.
* lint:eslint:fix -- Run ESLint fixes on all `*.js` and `*.jsx` files excluding the directories and files defined in `.prettierrc`.
* pretest -- Runs before test to delete `coverage` directory and run lint.
* test -- Run Enzyme unit tests on all `*.test.js` files just once.
* test:watch -- Watches all `*.test.js` files for changes and runs Enzyme unit tests on the changed files.
* test:snapshots:update -- Generates Jest snapshots.
* test:clean -- Deletes the `coverage` directory.
* test:coverage -- Runs test:clean before generating a Jest unit test code coverage report in the `coverage` directory.


## Important React Boilerplate 3.7.0 Notes

* `connected-react-router` needs to be 4.5.0. Version 5.0.0 and above breaks React Router code. This is most likely caused by the [breaking changes](https://github.com/supasate/connected-react-router/releases) in 5.0.0.
* `immutable` needs to be 3.8.2. Version 4.0.0 and above breaks the Redux / Reselect code. This is most likely caused by the [breaking changes](https://github.com/facebook/immutable-js/releases) in 4.0.0.
* `react-redux` needs to be 5.1.0. Version 6.0.0 and above breaks the Redux code. This is most likely caused by the [breaking changes](https://github.com/reduxjs/react-redux/releases/tag/v6.0.0) in 6.0.0.
* `internals/webpack/webpack.base.babel.js` has some additional code to run Styled Components, LESS and JSX.

```
{
    // Transform all .js & .jsx files required somewhere with Babel
    test: /\.(js|jsx)$/,
    use: {
        loader: 'babel-loader',
        options: options.babelQuery,
    },
},
{
    // Preprocess .less files
    test: /\.less$/,
    use: [
        {
            loader: 'style-loader',
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[local]-[hash:base64:5]',
            },
        },
        {
            loader: 'less-loader',
            options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[local]-[hash:base64:5]',
            },
        },
    ],
},
```

```
resolve: {
    alias: {
        'styled-components': path.resolve(
            './node_modules/styled-components'
        ),
    },
},
```

* `babel.config.js` requires `node_modules/@bime/bime.web.reactcomponents` in the production environment to run the build script.

```
env: {
    production: {
        only: [
            'app',
            'node_modules/@bime/bime.web.reactcomponents',
        ],
    },
},
```

* `jest.config.js` requires the code below to enable the Jest unit tests to import `@bime/bime.web.reactcomponents` properly.

```
module.exports = {
    transformIgnorePatterns: [
        'node_modules/(?!(@bime/bime.web.reactcomponents))',
    ],
};
```

## NPM Registry

@bime/bime.web.reactcomponents is a the required npm packge of this project and it is published on BiMe GitHub Package Registry.

* Follow instruction at https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages and you need to create a token to authenticate.

## Quick Start

1. Download and install the latest [Node.js LTS version](https://nodejs.org/en/). Node.js Version 8.1 and above and npm version 5.x and above.
2. Go to this directory on your computer: `cd BiMe.Web.ConsumerApp/BiMe.Web.ConsumerApp/ClientApp/`.
3. Run `npm install --legacy-peer-deps` in order to install dependencies and be sure to include the legacy peer dependency flag.
4. Run `npm start` to run in development mode.
5. Run `npm run start:mock` to run in development mode with mocked APIs.
6. View the app at [http://localhost:3000](http://localhost:3000).

### .NET

1. Go to this directory on your computer: `cd BiMe.Web.ConsumerApp/BiMe.Web.ConsumerApp/`.
2. Run `dotnet run`. You should see the line `Now listening on: http://localhost:XXXXX`. XXXXX is randomly generated
3. View the app at [http://localhost:XXXXX](http://localhost:XXXXX).

## Directory Structure

```
+-- app
|   +-- components                      // This directory contains dumb/presentational React components which depend on containers for data.
    |   +-- ComponentName               // React component should have a directory using the pascal case format to match the component name.
        |   +-- index.js                // React component should have a index.js file for the component matching ComponentName.
        |   +-- tests                   // React component should have a tests directory to store the unit tests.
            |   +-- index.test.js       // React component should have a *.test.js file for unit tests.
    |   +-- index.js                    // This index.js file exports the React components.
|   +-- containers                      // This directory contains React components which are connected to the redux store.
    |   +-- ComponentName               // React component should have a directory using the pascal case format to match the component name.
        |   +-- index.js                // React component should have a index.js file for the component matching ComponentName.
        |   +-- actions.js              // Redux actions should be stored in actions.js file.
        |   +-- constants.js            // Redux action names should be stored in constants.js file.
        |   +-- reducer.js              // Redux reducer functions should be stored in reducer.js file.
        |   +-- saga.js                 // Redux saga functions should be stored in saga.js file.
        |   +-- selectors.js            // Redux Reselect selectors should be stored in selectors.js file.
        |   +-- styles.less             // React component can have an optional *.less file for CSS.
        |   +-- tests                   // React component should have a tests directory to store the unit tests.
            |   +-- index.test.js       // React component should have a *.test.js file for unit tests.
|   +-- fonts                           // woff/woff2 font files are stored in this directory.
|   +-- helpers                         // Common Javascript functions are stored in this directory.
|   +-- images                          // Project image files are stored in this directory.
|   +-- tests                           // Unit tests for the app store and reducers are stored in this directory.
|   +-- utils                           // React Boilerplate Redux utilities.
|   +-- app.js                          // Root React component declaration.
|   +-- configureStore.js               // Redux store declaration.
|   +-- globalConstants.js              // Javascript constants for the app.
|   +-- globalStyles.js                 // Styled Components global CSS styles for the app.
|   +-- index.html                      // Redux route and global declarations.
|   +-- reducers.js                     // Styled Components global CSS styles for the app.
|   +-- schema.js                       // Add notes
+-- coverage                            // Jest unit test coverage report gets generated here.
+-- internals                           // The the "engine" of your app. Your source code cannot be executed as-is in the web browser. It needs to pass through webpack to get converted into a version of Javascript that web browsers understand.
+-- node_modules                        // All required npm packages get installed in this directory.
+-- server                              // This directory contains development and production server configuration.
+-- .eslintrc.js                        // ESLint configurations.
+-- .prettierignore                     // Prettier code formatter directories and files to ignore.
+-- .prettierrc                         // Prettier code formatter configurations.
+-- babel.config.js                     // Babel configurations.
+-- jest.config.js                      // Jest unit testing configurations.
+-- stylelintCSS.json                   // Stylelint configurations for *.css and *.less files.
+-- stylelintStyledComponents.json    // Stylelint configurations for Styled Components in *.js and *.jsx files.
```

## Code Quality

We use [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/), Airbnb's [JavaScript](https://github.com/airbnb/javascript) and [React/JSX](https://github.com/airbnb/javascript/tree/master/react) Style Guide.

The code quality rules were adapted from [React Boilerplate](https://www.reactboilerplate.com/).

The list of rules can be found in the `.eslintrc.js` and `.prettierrc` files.

You may run the following scripts to fix the Stylelint and ESLint errors that can be fixed automatically.

* `npm run lint:stylelint:fix`
* `npm run lint:stylelint:styled:fix`
* `npm run lint:eslint:fix`


## Add new Registered Field
To add a new register fields, you have to do some of the following:
* Add the new field in app\containers\fields folder
* Add new Redux action app\containers\App\constants.js
* Update fieldSelectors.js
* Update fieldsReducer.js
* Update fieldRegister.js (important!)
* Update customerInfoMapper.js (to send data to server)

## Add a new _registered_ page into the flow
* Add a new folder under app/containers/pages. It should be ending with 'Page' (e.g. SomethingPage)
* Add index.js
* Add Redux files (optional)
* Register the new page with a new __type__ in _pageRegister.js_
* Add your page to the schema (e.g. schema.thinslice.js). Page schema should have these standard properties:
    * id
    * path
    * type
    * title
    * progressBarPercentage
    * headingKey (contentKey)
    * infoBoxHeadingKey (contentKey)
    * infoBoxContentKey (contentKey)
    * prevUrl
    * nextUrl
* You can have your custom properties but try to minimize it to when absolutely necessary. We don't want to have hundreds of properties.
* There is a helper in _helpers/pageSchema_ to help you get the schema from your component's constructor.
* Example complex pages:
    * GenericPage: this is a generic form that can contain any number of _registered_ fields. The property _fields_ is an array of fields to be rendered.
    * ProductSelection (this is the QuickQuote page). It has a custom property _goToMvcIfPossible_, which allow the flow to skip directly to MVC (instead of normally go to the nextUrl) depending on certain logic.

