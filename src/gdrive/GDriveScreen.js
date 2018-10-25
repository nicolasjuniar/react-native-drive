import React, {Component} from 'react'
import GDriveComponent from './GDriveComponent'
import {GoogleSignin, statusCodes} from "react-native-google-signin";
import {ToastAndroid, Alert} from "react-native"
import axios from "axios";
import Constant from '../constant/Constant'
import {endpoint} from "../api/Api"
import {getIconName} from "../Utils";

export default class GDriveScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            listFile: [],
            isLoading: false
        }
    }

    getListFile() {
        const accessToken = this.state.userInfo.accessToken
        this.setState({isLoading: true})
        axios.get(endpoint.GET_LIST_FILE, {
            params: {
                orderBy: 'folder'
            },
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        }).then(response => {
            this.setState({listFile: response.data.items})
        }).catch(
            error => {
                ToastAndroid.show(error.toString(), ToastAndroid.LONG)
            }
        ).finally(
            this.setState({isLoading: false})
        )
    }

    deleteFile = fileId => {
        const accessToken = this.state.userInfo.accessToken
        Alert.alert(
            'Delete File',
            'Are you sure want to delete this file?',
            [
                {text: 'No', style: 'cancel'},
                {
                    text: 'Yes', onPress: () => {
                        axios.delete(endpoint.DELETE_FILE + fileId, {
                            headers: {
                                "Authorization": "Bearer " + accessToken
                            }
                        }).then(response => {
                            this.setState({
                                listFile: this.state.listFile.filter(driveFile => {
                                    return driveFile.id !== fileId
                                }, ToastAndroid.show("Delete Success", ToastAndroid.LONG))
                            })
                        }).catch(error => {
                            ToastAndroid.show(error.toString(), ToastAndroid.LONG)
                        }).finally(
                            this.setState({isLoading: false})
                        )
                    }
                },
            ],
            {cancelable: false}
        )
    }

    googleSignIn = async () => {
        try {
            this.setState({isLoading: true})
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
        } finally {
            this.setState({isLoading: false})
        }
    };

    googleSignOut = async () => {
        try {
            await this.setState({isLoading: true})
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({user: null, isLogin: false, listFile: []});
            ToastAndroid.show('Logout Success', ToastAndroid.LONG)
        } catch (error) {
            ToastAndroid.show(error.toString(), ToastAndroid.LONG)
        } finally {
            this.setState({isLoading: false})
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
            scopes: [Constant.DRIVE_READ_ONLY, Constant.DRIVE_AUTH, Constant.DRIVE_APPDATA, Constant.DRIVE_FILE], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '356930109629-ndkbpm5h6t3s4pfn54ds738u0ususp4t.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
            accountName: '', // [Android] specifies an account name on the device that should be used
        });
        return (
            <GDriveComponent
                onOptionSelected={this.onOptionSelected}
                listFile={this.state.listFile}
                isLogin={this.state.isLogin}
                onItemPress={this.deleteFile}
                isLoading={this.state.isLoading}/>
        )
    }
}
