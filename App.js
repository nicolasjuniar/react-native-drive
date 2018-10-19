import React, {Component} from 'react';
import {Platform, StyleSheet, ToastAndroid, View} from 'react-native';
import {GoogleSignin, GoogleSigninButton, statusCodes} from 'react-native-google-signin';

type Props = {};
export default class App extends Component<Props> {

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({userInfo});
            ToastAndroid.show("success "+userInfo.accessToken,ToastAndroid.LONG)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                ToastAndroid.show("sign in cancelled", ToastAndroid.LONG)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                ToastAndroid.show("in progress", ToastAndroid.LONG)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                ToastAndroid.show("sign in cancelled", ToastAndroid.LONG)
            } else {
                ToastAndroid.show("error: " + error.code, ToastAndroid.LONG)
            }
        }
    };

    render() {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '356930109629-ndkbpm5h6t3s4pfn54ds738u0ususp4t.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
            accountName: '', // [Android] specifies an account name on the device that should be used
        });
        return (
            <View style={styles.container}>
                <GoogleSigninButton
                    style={{width: 48, height: 48}}
                    size={GoogleSigninButton.Size.Icon}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => this.signIn()}
                    disabled={false}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
