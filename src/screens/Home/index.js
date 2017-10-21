import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as homeActions from '../../actions/home';

class Home extends Component {
  componentWillMount() {
    this.props.homeActons.getHomeInfo({
      info: 'test'
    });
  }
  render() {
    console.log(this.props);

    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home
  };
}

function mapDispatchToProps(dispatch) {
  return {
    homeActons: bindActionCreators(homeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
