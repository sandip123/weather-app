const request =require('request');

const geocode = (Address,CallBack)=>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(Address) +'.json?access_token=pk.eyJ1Ijoic2FkbmlwMTk4OCIsImEiOiJja3FmNmdyNGowdHZ2Mm5wZW9xejNxczgxIn0.n7aXpXSwYVYx4789TMzBEw&limit=1';
    
    request({url,json:true},(error,{body})=>{
      if(error){
          CallBack('Unable to connect to Location service',undefined);
      }else if(!body.features){
        CallBack('Location Not Fond', undefined);
      }else if(body.features.length ===0){
        CallBack('Location Not Fond. Try another search ..!!',undefined);
      }
      else{
        const {center,place_name}=body.features[0];
          CallBack(undefined,{
            latitude:center[1],
            longitude:center[0],
            Location:place_name
          });
      }
    });
    };

    module.exports=geocode;