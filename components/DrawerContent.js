import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faLock, faAddressCard, faHome, faList, faHeart, faCartArrowDown, faCartPlus, faShoppingBag, faSignOutAlt, faSign, faSignInAlt, } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {
    Avatar,
    Drawer,
    Title,
    Caption,
    Text
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { logoutUser } from '../redux/ActionCreators';
import AsyncStorage from '@react-native-community/async-storage';

const mapStateToProps = state => {
    return {
        userinfo: state.userinfo,
        auth: state.auth,
        favorits: state.favorits
    }
}

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
});

const Drawercontent = (props) => {
    
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15, }}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>

                                {
                                    props.auth.isAuthenticated?
                                        <View>
                                        <Title style={styles.title}>{props.userinfo.user_info.fullname}</Title>
                                        <Caption style={styles.caption}>@{props.userinfo.user_info.username}</Caption>
                                        </View>
                                    :
                                        <View>
                                        <Title style={styles.title}>VilliageProducts</Title>
                                        <Caption style={styles.caption}>@v_products</Caption>
                                        </View>
                                }
                                {
                                   console.log(props.auth)
                                }

                            </View>
                        </View>

                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem 
                                icon={() => (
                                    <FontAwesomeIcon icon={faHome} size={20} color={"black"} />
                                )}
                                label="Home"
                                onPress={() => {props.navigation.navigate('Home')}}
                            />
                            <DrawerItem 
                                icon={() => (
                                    <FontAwesomeIcon icon={faList} size={20} color={"black"} />
                                )}
                                label="Products"
                                onPress={() => {props.navigation.navigate('Products')}}
                            />
                            <DrawerItem 
                                icon={() => (
                                    <FontAwesomeIcon icon={faHeart} size={20} color={"black"} />
                                )}
                                label="Favorits"
                                onPress={() => {props.navigation.navigate('Favorits')}}
                            />
                            <DrawerItem 
                                icon={() => (
                                    <FontAwesomeIcon icon={faCartPlus} size={20} color={"black"} />
                                )}
                                label="Cart"
                                onPress={() => {props.navigation.navigate('Products')}}
                            />
                            <DrawerItem 
                                icon={() => (
                                    <FontAwesomeIcon icon={faShoppingBag} size={20} color={"black"} />
                                )}
                                label="Orders"
                                onPress={() => {props.navigation.navigate('Products')}}
                            />
                        </Drawer.Section>
                    </View>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.drawerSection}>
            </Drawer.Section>
            <Drawer.Section style={styles.bottomDrawerSection}>
                {
                    !props.auth.isAuthenticated ?
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesomeIcon icon={faSignInAlt} size={20} color={"black"} />
                            )}
                            label="Sign In"
                            onPress={() => {props.navigation.navigate('Login')}}
                        />
                    :
                        <DrawerItem 
                            icon={() => (
                                <FontAwesomeIcon icon={faSignOutAlt} size={20} color={"black"} />
                            )}
                            label="Logout"
                            onPress={() => {props.logoutUser()}}
                        />
                }
            </Drawer.Section>
        </View>
    );
}

//export default Drawercontent;
export default connect(mapStateToProps, mapDispatchToProps)(Drawercontent);


const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
      paddingTop: 50
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
});