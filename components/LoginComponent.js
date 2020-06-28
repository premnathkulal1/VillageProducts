import * as React from 'react';
import {
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    ActivityIndicator,
    Modal
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faLock, faAddressCard, } from '@fortawesome/free-solid-svg-icons';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import Feather from 'react-native-vector-icons/Feather';
import { loginUser, loginWithFacebookUser } from '../redux/ActionCreators';
import * as Facebook from 'expo-facebook';

global.login = "LOGIN_REQUEST_END";
const mapStateToProps = state => {
    return {
        auth: state.auth,
        userinfo: state.userinfo,
        favorits: state.favorits
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginUser: (creds) => dispatch(loginUser(creds)),
    loginWithFacebookUser: (token) => dispatch(loginWithFacebookUser(token))
});

const LoginScreen = (props) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        isValidUser: true,
        isValidPassword: true,
        secureTextEntry: true
    });

    const textInputChange = (val) => {
        setData({
            ...data,
            username: val
        });
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const loginHandle = (username, password) => {
        props.loginUser({username, password});
        setData({
            ...data,
            username: '',
            password: '',
            isValidUser: true,
            isValidPassword: true,
            secureTextEntry: true
        });
        global.login="LOGIN_REQUEST"
    }

    const facebookLogIn = async () => {
        //alert("Hello");
        Facebook.initializeAsync("1714345048744317", "villiageProducts");
        try {
          const {
            type,
            token
          } = await Facebook.logInWithReadPermissionsAsync('1714345048744317', {
            permissions: ['public_profile'],
          });
          if (type === 'success') {
            props.loginWithFacebookUser(token)
          } 
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
    }

    const gotoNextScreen = () => {
        global.login = "LOGIN_REQUEST_END";
        props.navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Login</Text>
            </View>
            <Animatable.View 
                animation="fadeInUpBig"
                style={[styles.footer, {
                    //backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    //color: colors.text
                }]}>Username</Text>
                <View style={styles.action}>
                    <FontAwesomeIcon icon={faUser} size={20} color={"black"} />
                    <TextInput 
                        placeholder="Your Username"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        value={data.username}
                        onChangeText={(val) => textInputChange(val)}
                    />
                </View>
                { data.isValidUser ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                </Animatable.View>
                }
                <Text style={[styles.text_footer, {
                    //color: colors.text,
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <FontAwesomeIcon icon={faLock} size={20} color={"black"} />
                    <TextInput 
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        value={data.password}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather 
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                        :
                            <Feather 
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                { 
                    data.isValidPassword ? null : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>This field required</Text>
                    </Animatable.View>
                }

                { 
                    props.auth.errMess === null ? null : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Username and Password not matching</Text>
                    </Animatable.View>
                }
                {
                    !(props.auth.errMess===null && props.auth.isAuthenticated && global.login=="LOGIN_REQUEST") ? null : gotoNextScreen()
                }
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {loginHandle( data.username, data.password )}}
                    >
                    <LinearGradient
                        colors={['#01ab9d', '#05375a']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff'
                        }]}>Sign In</Text>
                    </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Register')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style={{paddingTop: 10, paddingBottom: 10}}>Or</Text>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => facebookLogIn()}
                    >
                    <LinearGradient
                        colors={['#008fff', '#aff']}
                        style={styles.signIn}
                    >
                        <FontAwesomeIcon icon={faFacebook} size={40} color={"blue"} />
                    </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
            {   
                !(props.auth.isLoading) ? null:
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={true}
                >
                    <View style={styles.modal}>
                        <View style={styles.loaddingModel}>
                            <ActivityIndicator size={60} color="#512DA8" />
                        </View>
                    </View>
                </Modal>
            }

        </View>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#512DA8'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 40
    },
    footer: {
        flex: 6,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    loaddingModel: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 280,
    },
    modal: {
        flex:  1,
        backgroundColor: 'rgba(0,0,0,0.6)'
    }
  });