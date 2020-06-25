import * as React from 'react';
import { View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    Modal,
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faLock, faAddressCard, } from '@fortawesome/free-solid-svg-icons';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { registerUser } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        register: state.register
    }
}

const mapDispatchToProps = dispatch =>  ({
    registerUser: (username, password, fullname, adress, admin) => dispatch(registerUser(username, password, fullname, adress, admin))
});

const RegsterScreen = (props) => {

    const [data, setData] = React.useState({
        username: '',
        fullname: '',
        adress: '',
        password: '',
        confirm_password: '',
        isValidUser: true,
        isValidPassword: true,
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isPasswordMatch: true,
        isFullnameValid: true,
        isAdressValid: true,
        isWrongUsername: false,
    });

    const usernametextInputChange = (val) => {
        setData({
            ...data,
            isWrongUsername: false
        }) 
        if(val.length < 4){
            setData({
                ...data,
                check_textInputChange: false,
                isValidUser: false
            });
        }
        else{
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        }
    }

    const handlePasswordChange = (val) =>{
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val,
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const registerHandle = (username, password, fullname, adress) => {
        var admin = false;
        if(username.length<4){
            setData({
                ...data,
                check_textInputChange: false,
                isValidUser: false
            });
        } 
        else if(password.length<8){
            setData({
                ...data,
                isValidPassword: false
            });
        }
        else if(!(data.confirm_password === password)){
            setData({
                ...data,
                isPasswordMatch: false
            });
        }
        else if(fullname.length <= 0){
            setData({
                ...data,
                isFullnameValid: false
            });
        }
        else if(adress.length <= 0){
            setData({
                ...data,
                isAdressValid: false
            });
        }
        else{
            props.registerUser(username, password, fullname, adress, admin);
             setData({
                ...data,
                password: '',
                confirm_password: '',
                isValidUser: true,
                isValidPassword: true,
                check_textInputChange: false,
                secureTextEntry: true,
                confirm_secureTextEntry: true,
                isPasswordMatch: true,
                isFullnameValid: true,
                isAdressValid: true,
                isWrongUsername: false,
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Register</Text>
            </View>
            <Animatable.View 
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                <Text style={styles.text_footer}>Username</Text>
                <View style={styles.action}>
                <FontAwesomeIcon icon={faUser} size={20} color={"black"} />
                    <TextInput 
                        placeholder="Your Username"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => usernametextInputChange(val)}
                    />
                    {
                        data.check_textInputChange ? 
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                        :  
                            !props.register.errMess? 
                                null 
                            : 
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather 
                                        name="alert-circle"
                                        color="red"
                                        size={20}
                                    />
                                </Animatable.View>
                    
                    }
                </View>
                { data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                    </Animatable.View>
                }

                <Text style={[styles.text_footer, { marginTop: 35}]}>Fullname</Text>
                <View style={styles.action}>
                    <FontAwesomeIcon icon={faUser} size={20} color={"black"} />
                    <TextInput 
                        placeholder="Your Fullname"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => {
                            setData({
                                ...data,
                                fullname: val
                            });
                        }}
                    />
                </View>
                { data.isFullnameValid ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>This field Required</Text>
                    </Animatable.View>
                }
                <Text style={[styles.text_footer, { marginTop: 35}]}>Adress</Text>
                <View style={styles.action}>
                    <FontAwesomeIcon icon={faAddressCard} size={20} color={"black"} />
                    <TextInput 
                        placeholder="Your Adress"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => {
                            setData({
                                ...data,
                                adress: val
                            });
                        }}
                    />
                </View>
                { data.isAdressValid ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>This field Required</Text>
                    </Animatable.View>
                }

                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <FontAwesomeIcon icon={faLock} size={20} color={"black"} />
                    <TextInput 
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        value={data.password}
                        onChangeText = {(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={() => updateSecureTextEntry()}
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
                { data.isValidPassword ? null : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>
                }

                <Text style={[styles.text_footer, {
                    //color: colors.text,
                    marginTop: 35
                }]}>Re Type Password</Text>
                <View style={styles.action}>
                    <FontAwesomeIcon icon={faLock} size={20} color={"black"} />
                    <TextInput 
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        value={data.confirm_password}
                        onChangeText = {(val) => handleConfirmPasswordChange(val)}

                    />
                    <TouchableOpacity
                        onPress={() => updateSecureTextEntry()}
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
                { data.isPasswordMatch ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Password not matching.</Text>
                </Animatable.View>
                }

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {registerHandle( data.username, data.password, data.fullname, data.adress )}}
                    >
                    <LinearGradient
                        colors={['#01ab9d', '#05375a']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Sign Up</Text>
                    </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Login')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </Animatable.View>


            {   
                !props.register.isLoading ? null :
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
            {console.log(props.register)}
        </View>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(RegsterScreen);

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#512DA8'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    footer: {
        flex: 10,
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