const ds18b20 = require('ds18b20-raspi');
var temp = 0;

    ds18b20.readSimpleC((err, temperature) =>{
        if (err) {
            console.log(err);
            console.log("Brak urządzenia");
        } else {
            console.log(temperature);
            temp = temperature;
        }
    });
    
    module.exports.temp = temp;


