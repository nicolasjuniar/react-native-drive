import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import Color from '../constant/Color'
import {getExtensionFile} from "../Utils";

const driveFileComponent = (props) => (
    <View style={{
        margin: 8
    }}>
        <TouchableOpacity onPress={()=>props.onItemPress(props.driveFile.id)}>
            <View
                style={{
                    borderBottomColor: Color.blueInvestree,
                    borderBottomWidth: 1
                }}/>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{
                    marginTop: 10,
                    marginBottom: 10
                }}>{props.driveFile.name}</Text>
                <Text style={{
                    marginTop: 10,
                    marginBottom: 10
                }}>{getExtensionFile(props.driveFile.mimeType)}</Text>
            </View>
            <View
                style={{
                    borderBottomColor: Color.blueInvestree,
                    borderBottomWidth: 1
                }}/>
        </TouchableOpacity>
    </View>
);

driveFileComponent.propTypes = {
    driveFile: PropTypes.object.isRequired,
    onItemPress: PropTypes.func.isRequired
};


export default driveFileComponent
