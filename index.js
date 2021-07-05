const fs = require('fs')
const path = require('path')

const initializeApp = (app, controllers) => {
    for (const newController of controllers) {
        newController(app)
    }
}

const controller = (route, callback) => {
    return (app => {
        app.get(route, (req, res) => {
            const file = callback(dirname => {
                fs.readFile(dirname, 'utf8', (err, data) => {
                    if (err) throw err

                    return data
                })
            })

            res.send(file)
        })
    })
}

module.exports = {
    initializeApp,
    controller
}