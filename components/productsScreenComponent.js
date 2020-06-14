import * as React from 'react';
import { Button, View, Text, Modal, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card, Icon, Input, Rating, Image } from 'react-native-elements';
import Data from '../db';

class Products extends React.Component{
  constructor(props){
    super(props);
    this.state={
      catogory: this.props.catogory,
      showModal: false,
      ModelItem: {}
    }
  }

  toggleModal(id = "Jack Fruit Pickle (300 gm)"){
    this.setState({ModelItem: Data.products.filter((item) => item.name === id)[0]});
    this.setState({showModal: !this.state.showModal});
  }

  render(){

    const ListItem = ({item}) => {
      return (
        <TouchableOpacity style={styles.listitem} onPress={() => this.toggleModal(item.name)}>
          <Card
            style={styles.listItemView}
            featuredTitle={item.name}
          >
            <View style={{ alignItems: 'center', height: 200 }}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require('./images/food_0.jpg')}
            />
            <Text style={styles.listItemName}>{item.name}</Text>
            <Text style={styles.listItemPrice}>{item.price+' Rs'}</Text>
            </View>
          </Card>
        </TouchableOpacity>
      );
    };

    return(
      <View>
        <FlatList 
          data = {this.state.catogory === 'all' ? Data.products : Data.products.filter((item) => item.category == this.state.catogory)}
          renderItem = {({item}) => <ListItem item={item} />}
          numColumns={2}
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
            source={require('./images/food_0.jpg')}
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
              name='heart'
              type='font-awesome'
              color='#f50'
              //onPress={() => props.favorite ? console.log('Already favorite') : props.onPress() }
          />
          <Icon
              raised
              reverse
              name='cart-plus'
              //name='shopping-cart'
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

const styles = StyleSheet.create({
  listitem: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  listItemView: {
      width: 50,
      height: 50
  },
  listItemName: {
      fontSize: 18,
      textAlign: "center",
      fontWeight: 'bold'
  },
  listItemPrice: {
    fontSize: 18,
    textAlign: "center",
    color: 'green'
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
  }
})

export default Products;