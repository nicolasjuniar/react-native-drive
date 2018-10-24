import React from 'react'
import {StyleSheet} from 'react-native'
import Color from "../constant/Color";

const Styles = StyleSheet.create({
    toolbar: {
        backgroundColor: Color.greenInvestree,
        height: 56,
        alignSelf: 'stretch'
    },
    floatingActionButton: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 100,
    }
})

export default Styles
