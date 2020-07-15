const request = require("request");

const forecast=(latitude,longtitude,callback)=>{
    const url =
  "http://api.weatherstack.com/current?access_key=e94fb4a5bcc9edf76546b84123d4d851&query="+latitude+","+longtitude+"";

request({ url, json: true }, (error, {body}) => {
  const weather=body.current.weather_descriptions[0]
  const temperature=body.current.temperature
  const feelslike=body.current.feelslike
  if (error) {
    callback("unable to connect to weather service",undefined);
  } 
  else if(body.error){
callback('unable to find location',undefined)
  }
  else {
    callback
    (undefined, "The weather is "+ weather+". It is"+ 
      temperature+" degress out, but it feels like "+
      feelslike
      )
    
  }
});

}
module.exports=forecast