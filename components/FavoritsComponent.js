import * as React from 'react';
import { Button, View, Text, Modal, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Card, Icon, Input, Rating, Image, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    favorits: state.favorits,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => ({
    deleteFavorite: (favId) => dispatch(deleteFavorite(favId))
});

class Favorits extends React.Component{
  constructor(props){
    super(props);
    this.state={
      catogory: this.props.catogory,
      showModal: false,
      ModelItem: {}
    }
  }

  toggleModal(id = "Traditional Handmade Diya's"){
    this.setState({ModelItem: this.props.favorits.favorits.products.filter((item) => item.name === id)[0]});
    this.setState({showModal: !this.state.showModal});
  }

  render(){

    const ListItem = ({item}) => {

        const rightButton = [
            {
                text: 'Delete', 
                type: 'delete',
                onPress: () => { this.props.deleteFavorite(item._id) }
            }
        ];

        return (
            <Animatable.View animation="fadeInRightBig" duration={2000}>  
                <Swipeout right={rightButton} autoClose={true}>
                    <TouchableOpacity style={styles.listitem} onPress={() => this.toggleModal(item.name)}>
                    
                            <View style={styles.listItemView}>
                                <Avatar
                                    rounded
                                    size={50}
                                    source={{
                                        uri: baseUrl + item.image,
                                    }}
                                />
                                <Text style={styles.listItemText}>
                                    {item.name}
                                </Text>
                            </View>
                    
                    </TouchableOpacity>
                </Swipeout>
            </Animatable.View>
        );
    };

    if(this.props.favorits.isLoading){
      return(
          <Loading />
      );
    }
    else if(!this.props.auth.isAuthenticated){
        return (
            <Text style={styles.loginRequestText}>*** Login to get your Favorits list ***</Text>
        )
    }
    else if(this.props.favorits.errMess !== null){
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}} > 
                <Icon
                    name='heart'
                    type='font-awesome'
                    color='red'
                    size={50}
                /> 
                <Text style={{fontSize: 20, fontWeight: "bold"}}>*** You dont have any favorits ***</Text>
            </View>
        )
    }
    else if(this.props.favorits.favorits.products.length === 0){
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}} > 
                <Icon
                    name='heart'
                    type='font-awesome'
                    color='red'
                    size={50}
                /> 
                <Text style={{fontSize: 20, fontWeight: "bold"}}>*** You dont have any favorits ***</Text>
            </View>
        )
    }
    else{
      return(
        <View>
          <FlatList 
                data = {this.props.favorits.favorits.products}
                renderItem = {({item}) => <ListItem item={item} />}
           />
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.showModal}
            onDismiss={() => this.toggleModal()}
            onRequestClose={() => this.toggleModal()}
            style={{width: 100, height: 100}}
            propagateSwipe={true}
          >
            <View style={styles.modal}>
              <Image 
                style={styles.modalImage}
                source={{uri: baseUrl+this.state.ModelItem.image}}
              />
              <Text style={styles.modalTitle}>{this.state.ModelItem.name}</Text>
              <Text style={styles.modalPrice}>{this.state.ModelItem.price + " Rs"}</Text>
              <Text style={styles.modalCombo}>
                  {"Combo of " + this.state.ModelItem.combo + " pieces"}
              </Text>
              <Text style={styles.modalDescription}>{this.state.ModelItem.description + " Rs"}</Text>
            </View>
            <View style={styles.iconRow}>
                <Icon
                    raised
                    reverse
                    name='cart-plus'
                    type='font-awesome'
                    color='blue'
                    //style={styles.cardItem}
                    //onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} 
                />
            </View>
          </Modal>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
    listitem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
    },
    listItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    listItemText: {
        fontSize: 18,
        alignItems: 'center',
        marginLeft: 10
    },
    listItemName: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: 'bold'
    },
    
    modal: {
        justifyContent: "center",
        margin: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        width: 325,
        marginBottom: 10
    },
    modalPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#fff',
        textAlign: 'center',
        color: 'green',
        borderWidth:  2,
        borderRadius: 50,
        borderEndWidth: 100
    },
    modalCombo: {
        fontWeight: 'bold',
        backgroundColor: '#fff',
        textAlign: 'center',
        color: 'green',
        paddingTop: 10,
        marginBottom: 20
    },
    modalDescription: {
        backgroundColor: '#fff',
        textAlign: 'center'
    },
    iconRow: {
        alignItems: 'center',
        justifyContent: "center",
        flex: 1,
        flexDirection: 'row'
    },
    modalImage: {
        width: 200, 
        height: 200
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow:'hidden'
    },
    loginRequestText: {
        flex: 1,
        fontWeight: "bold",
        fontSize: 20,
        paddingTop: 250,
        marginLeft: 20,
        color: "#808080"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Favorits);