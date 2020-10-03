import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/index";

import socketIoMiddleware from "./middlewares/socketio";
import spamUserActionFilter from "./middlewares/spamUserActionFilter";
import logger from "redux-logger";

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from "react-apollo";

import App from "./components/App";
import { getInitialGameState, getInitialSessionState } from "./constants";
import { login } from "./actions";
import "semantic-ui-css/semantic.min.css";
import { AppContainer } from "react-hot-loader";

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: "/graphql" }),
});

let middlewares = [
  apolloClient.middleware(),
  spamUserActionFilter,
  socketIoMiddleware,
];

if (process.env.NODE_ENV != "production") {
  middlewares.unshift(logger);
}

const store = createStore(
  combineReducers({ app: reducer, apollo: apolloClient.reducer() }),
  { app: { game: getInitialGameState(), session: getInitialSessionState() } },
  applyMiddleware(...middlewares)
);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>{Component}</AppContainer>,
    document.getElementById("app")
  );
};

render(
  <ApolloProvider store={store} client={apolloClient}>
    <App />
  </ApolloProvider>
);

if (module.hot) {
  module.hot.accept();
  // module.hot.accept('./containers/App', () => { render(<Provider store={store}>
  //           			<App/>
  // 				</Provider>) })
}
