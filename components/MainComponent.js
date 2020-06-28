import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import ProductScreen from './ProductsListComponent';
import HomeScreen from './HomeComponent';
import Drawercontent from './DrawerContent';
import Favorits from './FavoritsComponent';
import LoginScreen from './LoginComponent';
import RegsterScreen from './SignUpComponent';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/ActionCreators';

const HomeStack = createStackNavigator();
const ProductStack = createStackNavigator();
const FavoritstStack = createStackNavigator();
const LoginStack = createStackNavigator();
const RegisterStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
});

const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator 
      screenOptions = {{
        headerStyle: {
          backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options = {{
            headerLeft: () => (
              <Icon 
                reverse
                name='menu' 
                size={25} 
                color='#512DA8'
                onPress= {() => {navigation.openDrawer()}}
              />
            )
          }}
      />
    </HomeStack.Navigator>
);

const ProductStackScreen = ({ navigation }) => (
  <ProductStack.Navigator 
      screenOptions = {{
        headerStyle: {
          backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
    <ProductStack.Screen
        name="Products"
        component={ProductScreen}
        options = {{
          headerLeft: () => (
            <Icon 
              reverse
              name='menu' 
              size={25} 
              color='#512DA8'
              onPress= {() => {navigation.openDrawer()}}
            />
          )
        }}
    />
  </ProductStack.Navigator>
);

const FavoritstStackScreen = ({ navigation }) => (
  <FavoritstStack.Navigator 
      screenOptions = {{
        headerStyle: {
          backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
    <FavoritstStack.Screen
        name="Favorits"
        component={Favorits}
        options = {{
          headerLeft: () => (
            <Icon 
              reverse
              name='menu' 
              size={25} 
              color='#512DA8'
              onPress= {() => {navigation.openDrawer()}}
            />
          )
        }}
    />
  </FavoritstStack.Navigator>
);

const LoginStackScreen = ({ navigation }) => (
  <LoginStack.Navigator 
      screenOptions={{headerShown: false,}}
  >
    <LoginStack.Screen
        name="Login"
        component={LoginScreen}
    />
  </LoginStack.Navigator>
);

const RegisterStackScreen = ({ navigation }) => (
  <RegisterStack.Navigator 
      screenOptions={{headerShown: false,}}
  >
    <RegisterStack.Screen
        name="Register"
        component={RegsterScreen}
    />
  </RegisterStack.Navigator>
);

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <Drawercontent {...props}/>} >
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="Favorits" component={FavoritstStackScreen} />
        <Drawer.Screen name="Products" component={ProductStackScreen} />
        <Drawer.Screen name="Login" component={LoginStackScreen} />
        <Drawer.Screen name="Register" component={RegisterStackScreen} />
      </Drawer.Navigator>
   </NavigationContainer>
  );
}

//const Main =  createAppContainer(MainNavigator);

class Main extends React.Component {

  componentDidMount() {
    this.props.fetchProducts();
    /*NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });*/
  }

  render() {
    return(
      <MainNavigator />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);