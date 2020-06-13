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

    const All = ({ navigation }) => {
      return (
        <Products name="all" />
      );
    };

    const Craft = ({ navigation }) => {
      return (
        <Products name="craft" />
      );
    }

    const Food = ({ navigation }) => {
      return (
        <Products name="food" />
      );
    }

    return (
      <Tab.Navigator
        initialRouteName="All"
        tabBarOptions={{
          activeTintColor: '#FFFFFF',
          inactiveTintColor: '#F8F8F8',
          style: {
            backgroundColor: '#633689',
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