const ds18b20 = require('ds18b20-raspi');
var temp;
    ds18b20.readSimpleC((err, temperature) =>{
        if (err) {
            console.log(err);
            console.log("Brak urządzenia");
        } else {
           
            temp = temperature;
        }
    });
    
    module.exports.temp = temp;


