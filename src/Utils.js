import React, {Component} from 'react'
import {Platform} from 'react-native'

export const isAndroid = Platform.OS === 'android'

export const getExtensionFile = mimeType => {
    switch (mimeType) {
        case 'application/pdf':
            return '.pdf'
        case 'application/vnd.google-apps.folder':
            return 'folder'
        default:
            return mimeType
    }
}
