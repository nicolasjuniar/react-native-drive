import React, {Component} from 'react'
import {Platform} from 'react-native'

export const isAndroid = Platform.OS === 'android'

export const getIconName = mimeType => {
    switch (mimeType) {
        case 'application/pdf':
            return 'book'
        case 'application/vnd.google-apps.folder':
            return 'folder'
        case 'image/png':
            return 'image'
        case 'application/zip':
            return 'archive'
        case 'text/html' || 'text/javascript':
            return 'language'
        case 'application/json':
            return 'description'
        case 'text/javascript':
            return 'language'
        default:
            return mimeType
    }
}
