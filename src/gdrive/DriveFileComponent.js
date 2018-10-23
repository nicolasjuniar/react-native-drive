import React from 'react'
import {View, Text, ToolbarAndroid} from 'react-native'
import {isAndroid} from '../Utils'
import PropTypes from 'prop-types'
import Color from '../constant/Color'
import Styles from './GDriveStyle'

const driveFileComponent = (props) => (
    <View style={{
        margin: 8
    }}>
        <View
            style={{
                borderBottomColor: Color.blueInvestree,
                borderBottomWidth: 1
            }}/>
        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between'}}>
            <Text style={{
                marginTop: 10,
                marginBottom: 10
            }}>{props.driveFile.name}</Text>
            <Text style={{
                marginTop: 10,
                marginBottom: 10
            }}>{props.driveFile.mimeType}</Text>
        </View>
        <View
            style={{
                borderBottomColor: Color.blueInvestree,
                borderBottomWidth: 1
            }}/>
    </View>
);

driveFileComponent.propTypes = {
    driveFile: PropTypes.object.isRequired
};


export default driveFileComponent
