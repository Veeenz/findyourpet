import React from 'react';
import { View, Text } from 'react-native';
import {connect} from 'react-redux';
import { userProfileInformation } from '../actions/actions';

const mapStateToProps = state => ({
    user: state.user
})

class HomeScreen extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.userProfileInformation()

  }
  render(){
    console.log('homescreen');
    console.log(this.props);
    return(
      <View>
        <Text>
          Hello, {this.props.user.email}
        </Text>
      </View>
    );
  }
}

export default connect(mapStateToProps, { userProfileInformation })(HomeScreen);
