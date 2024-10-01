const { exec } = require("child_process");

const events = {
    CMD: 'shell.cmd',
};


function setup(socket) {
    socket.on(events.CMD, ({ command, rootFolder = "/", widgetId }) => {
        exec(command, { cwd: rootFolder }, (error, output, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }

            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            socket.emit(events.CMD, {
                command, output, widgetId
            })
        });
    });
};

const cleanup = () => { }

module.exports = {
    setup,
    cleanup
}
