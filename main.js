const fs = require('fs'); 
const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;

function createWindow() {
    var words = fs.readFileSync('firebaseconfig.json');
    var readData = JSON.parse(words);
    console.log(readData);

    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
    let win = new BrowserWindow({width, height});
    win.loadURL(`file://${__dirname}/index.html`);

    ipcMain.on('asynchronous-message', (event, arg) => {
        //if the main process received a object => write this object to the json file
        //if the main process received 1 => reply to the render process the readen
        //object from the json file

        switch(arg) {
         default:
            var writeData = JSON.stringify(arg, null, 2);
            fs.writeFile('firebaseconfig.json', writeData, finished);
            break;
         case 1:
            event.sender.send('asynchronous-reply', readData);
            break;
        }
        function finished(err){
            console.log('all set.');
        }
    });
}

app.on('ready', createWindow);
