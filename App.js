import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Loading } from './components/LoadingComponent';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator, View, Text } from 'react-native';

const { persistor, store } = ConfigureStore();

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      creds: '',
      isLoading: false
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if(token){
          this.setState({token: token});
          AsyncStorage.getItem('creds').then((creds) => {
            if(creds){
                this.setState({creds: creds});
            }
          });
      }
    }).then(() => {this.setState({isLoading: true})});
    
  }

  render(){
      if(this.state.isLoading){
        global.token = this.state.token;
        global.creds = this.state.creds;
        return (
          <Provider store={store}>
            <PersistGate
              loading = {<Loading />}
              persistor = {persistor}
            >
            <Main />
            </PersistGate>
          </Provider>
        );
      }
      else{
        return(
          <View style={{flex:1, alignItems: 'center', justifyContent: "center"}}>
            <ActivityIndicator size={60} color="red" />
          </View>
        );
      }
  }
};