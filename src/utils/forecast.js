const request =require('request');
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=454c0049fe069369be298498a2aba7da&query=' + longitude+',' + latitude+'&units=f'
    request({url,json:true},(error,{body})=>{
        const {weather_descriptions,temperature,feelslike,humidity} =body.current;
        if(error){
callback('Unable to connect to weather stack..!!',undefined)
        }else if(error){
            callback('Unable To fide location.',undefined);
        }
        else{
            callback(undefined,weather_descriptions[0] +". It is currently " + temperature + " Fahrenheit out. It's feels like  " + feelslike + " Fahrenheit out. And currently humidity is " +humidity + ' %');
        }
    });
};
module.exports=forecast;