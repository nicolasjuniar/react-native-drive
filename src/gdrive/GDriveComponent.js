import React from 'react'
import {FlatList, ToolbarAndroid, View} from 'react-native'
import {isAndroid} from '../Utils'
import PropTypes from 'prop-types'
import Color from '../constant/Color'
import Styles from './GDriveStyle'
import DriveFileComponent from './DriveFileComponent'

const gDriveComponent = (props) => (
    <View>
        {
            isAndroid &&
            <ToolbarAndroid
                style={Styles.toolbar}
                title={'React Native Drive'}
                titleColor={Color.blueInvestree}
                actions={[{title: props.actionBarTitle, show: 'always'}]}
                onActionSelected={props.onOptionSelected}/>
        }
        <FlatList
            data={props.listFile}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => (
                <DriveFileComponent driveFile={item}/>
            )}
        />
    </View>
);

gDriveComponent.propTypes = {
    onOptionSelected: PropTypes.func.isRequired,
    actionBarTitle: PropTypes.string.isRequired,
    listFile: PropTypes.array.isRequired
};


export default gDriveComponent
