const ds18b20 = require('ds18b20-raspi');
var temp = 0;

setInterval(function () {


    //temp++;
    //module.exports.temp = temp;
    ds18b20.readSimpleC((err, temperature) =>{
        if (err) {
            console.log(err);
            console.log("Brak urządzenia");
        } else {
            console.log("temperature" + temperature);
            temp = temperature;
            console.log("temp:" + temp);
            module.exports.temp = temp;

        }
    });
}, 10000); 
 

