const { exec } = require("child_process");
const events = require('./events');


function handleShellSocket(socket) {
    socket.on(events.SHELL.SEND(), (cmd) => {
        exec("ls -la", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }

            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            console.log(`stdout: ${stdout}`);
            socket.emit(events.SHELL.OUTPUT(), stdout)
        });
    });
};


module.exports = {
    handleShellSocket
}
