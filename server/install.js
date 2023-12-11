var Service = require('node-windows').Service;

const svc = new Service({
    name: "ckd-server",
    description: "ok",
    script: "E:\\CKD-Restaurant\\server\\dist\\index.js"
})

svc.on('install', function () {
    svc.start()
})

svc.install()