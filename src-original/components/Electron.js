// Test component to get contact with electron and filesystem (fs)
import React, { Component } from 'react'
const electron = window.require('electron')
const fs = electron.remote.require('fs')
const ipcRenderer = electron.ipcRenderer

class Electron extends Component {
    render() {
        console.log(electron, fs, ipcRenderer)
        return <div />
    }
}

export default Electron
