const ds18b20 = require('ds18b20-raspi');


    ds18b20.readSimpleC((err, temperature) =>{
        if (err) {
            console.log(err);
            console.log("Brak urządzenia");
        } else {
            var temp = 0;
            console.log("temperature" + temperature);
            temp = temperature;
            console.log("temp:" + temp);
        }
    });
    
    module.exports.temp = temp;


