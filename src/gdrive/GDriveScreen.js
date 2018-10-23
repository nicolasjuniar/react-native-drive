import React, {Component} from 'react'
import GDriveComponent from './GDriveComponent'
import {GoogleSignin, statusCodes} from "react-native-google-signin";
import {ToastAndroid, View,TouchableOpacity} from "react-native";
import axios from "axios";
import Constant from '../constant/Constant'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class GDriveScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            listFile: [{
                'name': 'abcdsdasdads',
                'mimeType': 'asdsa'
            }, {
                'name': 'asdsadsadsa',
                'mimeType': 'asd'
            }]
        }
    }

    getListFile() {
        const url = "https://www.googleapis.com/drive/v3/files"
        const accessToken = this.state.userInfo.accessToken
        console.log('access token: ' + accessToken)
        axios.get(url,
            {
                headers: {
                    "Authorization": "Bearer " + accessToken
                }
            }).then(response => {
            console.log(response.data.files)
            this.setState({listFile: response.data.files})
            ToastAndroid.show("sukses", ToastAndroid.LONG)
        }).catch(
            error => {
                console.log(error)
                ToastAndroid.show(error.toString(), ToastAndroid.LONG)
            }
        )
    }

    googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({userInfo, isLogin: true}, () => this.getListFile());
            ToastAndroid.show('Login Success', ToastAndroid.LONG)
        } catch (error) {
            switch (error.code) {
                case statusCodes.SIGN_IN_CANCELLED: {
                    ToastAndroid.show("sign in cancelled", ToastAndroid.LONG)
                    break
                }
                case statusCodes.IN_PROGRESS: {
                    ToastAndroid.show("in progress", ToastAndroid.LONG)
                    break
                }
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE: {
                    ToastAndroid.show("play services not available", ToastAndroid.LONG)
                    break
                }
                default: {
                    ToastAndroid.show("error: " + error.code, ToastAndroid.LONG)
                    break
                }
            }
        }
    };

    googleSignOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({user: null, isLogin: false});
            ToastAndroid.show('Logout Success', ToastAndroid.LONG)
        } catch (error) {
            console.error(error);
        }
    };

    onOptionSelected = (position) => {
        switch (position) {
            case 0: {
                this.state.isLogin ? this.googleSignOut() : this.googleSignIn()
            }
        }
    }


    render() {
        GoogleSignin.configure({
            scopes: [Constant.DRIVE_READ_ONLY, Constant.DRIVE_AUTH], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '356930109629-ndkbpm5h6t3s4pfn54ds738u0ususp4t.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
            accountName: '', // [Android] specifies an account name on the device that should be used
        });
        return (
            <View style={{flex:1}}>
                <GDriveComponent
                    onOptionSelected={this.onOptionSelected}
                    actionBarTitle={this.state.isLogin ? 'logout' : 'login'}
                    listFile={this.state.listFile}/>
                <TouchableOpacity
                    style={{
                        borderWidth:1,
                        borderColor:'rgba(0,0,0,0.2)',
                        alignItems:'center',
                        justifyContent:'center',
                        width:70,
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        height:70,
                        backgroundColor:'#fff',
                        borderRadius:100,
                    }}
                >
                    <Icon name="rocket"  size={30} color="#01a699" />
                </TouchableOpacity>
            </View>
        )
    }
}
