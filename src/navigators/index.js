import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addNavigationHelpers,
  StackNavigator,
  NavigationActions
} from 'react-navigation';

import * as screens from '../screens';

const AppRouter = StackNavigator({
  Home: { screen: screens.Home }
});

const preGetStateForAction = AppRouter.router.getStateForActio;
AppRouter.router = {
  ...AppRouter.router,
  getStateForActio(action, state) {
    const { type, routeName } = action;
    if (state && type === 'ReplaceCurrentScreen') {
      const routes = state.routes.slice(0, state.routes.length - 1);
      routes.push(action);
      return {
        ...state,
        routes,
        index: routes.length - 1
      };
    } else if (state && type === 'PopToScreen') {
      const targetIndex = state.routes.findIndex(
        item => item.routeName === routeName
      );
      if (targetIndex > -1) {
        const routes = state.routes.slice(0, targetIndex);
        const currentRoute = state.routes[targetIndex];
        currentRoute.params = action.params;
        routes.push(currentRoute);
        return {
          ...state,
          routes,
          index: targetIndex
        };
      }
    } else if (
      state &&
      type === NavigationActions.NAVIGATE &&
      routeName === state.routes[state.routes.length - 1].routeName
    ) {
      return null;
    }

    return preGetStateForAction(action, state);
  }
};

export const AppNavigator = AppRouter;

class Navigators extends React.Component {
  state = {};

  render() {
    const { dispatch, nav } = this.props;
    console.log(this.props);
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav
        })}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    nav: state.nav
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigators);
