import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Products from './productsScreenComponent';

const Tab = createMaterialTopTabNavigator();

class ProductScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      name: ""
    }
  }

  render(){

    const All = () => {
      return (
        <Products catogory="all" navigation={this.props.navigation} />
      );
    };

    const Craft = () => {
      return (
        <Products catogory="craft" navigation={this.props.navigation} />
      )
    }

    const Food = () => {
      return (
        <Products catogory="food" navigation={this.props.navigation} />
      );
    }

    return (
      <Tab.Navigator
        initialRouteName="All"
        tabBarOptions={{
          activeTintColor: '#FFFFFF',
          inactiveTintColor: '#F8F8F8',
          style: {
            backgroundColor: '#512DA8',
          },
          labelStyle: {
            textAlign: 'center',
          },
          indicatorStyle: {
            borderBottomColor: '#87B56A',
            borderBottomWidth: 2,
          },
        }}
      >
        <Tab.Screen name="All" component={All} />
        <Tab.Screen name="Craft" component={Craft} />
        <Tab.Screen name="Food" component={Food} />
      </Tab.Navigator>
    );
  }  
}

export default ProductScreen;