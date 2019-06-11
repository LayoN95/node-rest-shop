const ds18b20 = require('ds18b20-raspi');




module.exports = (req, res, next) => {
    ds18b20.readSimpleC((err, temperature) =>{
        if (err) {
            console.log(err);
            console.log("Brak urządzenia");
        } else {
           
           res.status(200).json({
               message: temperature
           });
        }
    });
    
}

