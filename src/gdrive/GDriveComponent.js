import React from 'react'
import {FlatList, ToolbarAndroid, TouchableOpacity, View} from 'react-native'
import {isAndroid} from '../Utils'
import PropTypes from 'prop-types'
import Color from '../constant/Color'
import Styles from './GDriveStyle'
import DriveFileComponent from './DriveFileComponent'
import Icon from "react-native-vector-icons/MaterialIcons";

const gDriveComponent = (props) => (
    <View style={{flex: 1}}>
        <View>
            {
                isAndroid &&
                <ToolbarAndroid
                    style={Styles.toolbar}
                    title={'React Native Drive'}
                    titleColor={Color.blueInvestree}
                    actions={[{title: props.isLogin ? 'logout' : 'login', show: 'always'}]}
                    onActionSelected={props.onOptionSelected}/>
            }
            <FlatList
                data={props.listFile}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <DriveFileComponent driveFile={item} onItemPress={props.onItemPress}/>
                )}
            />
        </View>
        {
            props.isLogin &&
            <TouchableOpacity
                style={Styles.floatingActionButton}>
                <Icon name="delete" size={30} color={Color.greenInvestree}/>
            </TouchableOpacity>
        }
    </View>
);

gDriveComponent.propTypes = {
    onOptionSelected: PropTypes.func.isRequired,
    listFile: PropTypes.array.isRequired,
    isLogin: PropTypes.bool.isRequired,
    onItemPress:PropTypes.func.isRequired
};


export default gDriveComponent
