import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import Color from '../constant/Color'
import color from 'react-native-material-color'
import {getIconName} from "../Utils";
import Icon from 'react-native-vector-icons/MaterialIcons'

const driveFileComponent = (props) => (
    <View style={{
        margin: 8
    }}>
        <TouchableOpacity
            onPress={() => getIconName(props.driveFile.mimeType) !== 'folder' && props.onItemPress(props.driveFile.id)}>
            <View
                style={{
                    borderBottomColor: Color.blueInvestree,
                    borderBottomWidth: 1
                }}/>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{
                    fontFamily: 'Roboto-Regular',
                    color: color.GREY["800"]
                }}>{props.driveFile.title}</Text>
                <Icon
                    name={getIconName(props.driveFile.mimeType)}
                    style={{
                        marginTop: 10,
                        marginBottom: 10
                    }}
                    color={color.GREY["800"]}
                    size={30}/>
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
