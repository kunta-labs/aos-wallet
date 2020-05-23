/*
Copyright 2017-Present The AfricaOS Authors
This file is part of the AfricaOS library.
The AfricaOS is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
The AfricaOS is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.
You should have received a copy of the GNU Lesser General Public License
along with the AfricaOS library. If not, see <http://www.gnu.org/licenses/>.
*/
const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
const path = require('path');
const url = require('url');
var fs = require('fs');
var LIBRARY = require('./Library.js')
// var querystring = require('querystring');
// process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;
// const http = require('http')
// var request = require('request');

let win

const DEFAULT_GLOBAL_STATE = {
  global_state_ip_address: '',
  global_state_ip_address_interim: '',
  global_state_block_height: -1
}

let GLOBAL_STATE = {}

function createWindow () {
  win = new BrowserWindow({
              width: 1400,
              height: 700,
              resizable: false,
              webPreferences: {
                  webSecurity: false,
                  nodeIntegration: false,
                  preload: __dirname + '/preload.js'
                }
            })
  //win.loadFile('html/index.html')
  //res.sendFile(path.join(__dirname, 'build', 'index.html'));

  // win.loadFile(path.join(__dirname, 'desktop', 'build', 'index.html'))
  //win.loadFile('html/index.html')
  //win.loadURL(`file://${__dirname}/build/index.html`)
  //win.loadURL(false ? 'http://localhost:3000' : `file://${path.join(__dirname, 'build/index.html')}`);
  //win.loadURL('http://localhost:3000');
  //win.loadURL('http://localhost:3000/')

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, 'build/index.html'),
    protocol: 'file:',
    slashes: true,
  });

  win.loadURL(startUrl);

  // Open the DevTools.
  win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', (function(){
  // win.webContents.on('did-finish-load', function() {
  //   win.webContents.executeJavaScript("alert('Hello There!');");
  // });
  console.log(win)
  createWindow()
}))


app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

/////////////////
ipcMain.on('latest_proposal_call_message', (event, arg) => {
    //console.log("latest_proposal_call_message call hit!")
    //console.log(arg)

    // TODO: DON'T call the network API from this event, since it is iterative
    // new LIBRARY.GetLatestProposal((function(result){
    //   event.sender.send('latest_proposal_call_reply', { "Result":  result });
    // }))

    // TODO: what is the highest proposal held in wallet?
    LIBRARY.GetHighestProposalFromDisk(function(proposal){

      console.log("callback for GetHighestBlockFromDisk")
      event.sender.send('latest_proposal_call_reply', { "Result":  proposal });

    })



})

ipcMain.on('global_metric_call_message', (event, arg) => {
    console.log("global_metric_call_message call hit!")

    if ( new LIBRARY.CompareObjects(arg, DEFAULT_GLOBAL_STATE) ) {
      console.log("DEFAULT GLOBAL STATE READ")
      let sync = new LIBRARY.Sync(arg)
      sync.start_proposal_sync_interval()
    }else{
      GLOBAL_STATE = arg
    }

    let latest_proposal = {
      "proposal_id": 11917,
      "proposal_status": "committed",
      "proposal_hash": "7bc15428fe6086cb8cd97df2ce050b301c1365585f920b9d404af1474e3d1175",
      "proposal_time": "1587998030",
      "proposal_sender": "3.80.54.83:8082",
      "proposal_block": {
        "block_id": 11917,
        "block_hash": "b8ddffdfd9ec80c4ea05f3d34222c1cd95f54cb53cd8f1dde67b1c5366bfaecd",
        "block_parent_hash":"b7881476d52708f40f2517d525de0704e5ccb1724c3248663b96fcb92c75a343",
        "block_time": "1587998030",
        "proposal_hash": "7bc15428fe6086cb8cd97df2ce050b301c1365585f920b9d404af1474e3d1175",
        "block_data": "TEST DATA",
        "transactions": {}
      }
    }

    LIBRARY.ReadProposal(0, function(file){
      console.log("DONE READING")
      console.log(file)
    })

    let global_metrics = {
      "latest_proposal": latest_proposal,
      "block_height": 100
    }

    event.sender.send('global_metric_call_reply',{ result:  global_metrics });

})


ipcMain.on('transaction_submit_output_call_message', (event, arg) => {
    console.log("transaction_submit_output_call_message call hit!")
    console.log(arg)

    // const postData = querystring.stringify({
    //   'msg': 'Hello World!'
    // });

    new LIBRARY.SubmitTransaction(arg, (function(result){
      event.sender.send('transaction_submit_output_call_reply', { "Result":  result });
    }))

})

ipcMain.on('private_key_save_call_message', (event, arg) => {
    console.log("private_key_save_call_message call hit!")
    console.log(arg)

    new LIBRARY.SavePrivateKey(arg.interim_private_key, (function(result){
      console.log("private key result: "+result)
      event.sender.send('private_key_save_call_reply', { "Result":  result });
    }))

})

ipcMain.on('public_key_save_call_message', (event, arg) => {
    console.log("public_key_save_call_message call hit!")
    console.log(arg)

    new LIBRARY.SavePublicKey(arg.interim_public_key, (function(result){
      console.log("public key result: "+result)
      event.sender.send('public_key_save_call_reply', { "Result":  result });
    }))

})
