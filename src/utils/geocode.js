const request = require("request");


const geocode=(address,callback)=>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieWFuZzA5MjMiLCJhIjoiY2tjaW53ZTZlMGJwNzJzbnBjdm90MGUzMSJ9.0NDL7v-EdThJ7KVCzZ9Ttw&limit=1'
    

    request({url,json:true},(error,{body})=>{
       
    if(error){
    callback('unable to connect to location services',undefined)
    }
    else if(body.features.length===0){
        callback('unable to find location. try another search',undefined)
    }else {
        const location=body.features[0].place_name
        const latitude=body.features[0].center[1]
        const longtitude=body.features[0].center[0]
        callback(undefined,{
            location,
            latitude,
            longtitude
        })
    }
    })
    }

    module.exports=geocode