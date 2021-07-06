const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(__filename);
// console.log();

// defile path for express cofig 
const publicDirectoryPAth=path.join(__dirname,'../public');
const viewsPath=(path.join(__dirname,'../templates/views'));
const partialsPath =(path.join(__dirname,'../templates/partials'));


// setup handalbar engin and view location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPAth));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'sandip kurhade',
        footerText:'Created By sandip.'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About static page!!',
        name:'sandip',
        footerText:'Created By sandip.'
    })
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help static page!!',
        helpText:'help text for site',
        footerText:'Created By sandip.'
    });
});


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'address must be provided!!'
        });
    }
        geocode(req.query.address,(error,{longitude,latitude,Location}={})=>{
            if(error){
             return  res.send({
                error
            });
            }
                // console.log(data);
                forecast(longitude,latitude, (error, ForeCastData) => {
                  if(error)
                  return res.send({error})
                  res.send({Location,Forecast:ForeCastData,address:req.query.address})
                //   console.log('Location is', Location )
                //   console.log('Data', ForeCastData )
                })
            });
});
app.get('/product',(req,res)=>{
    if(!req.query.search){
return res.send({
    error:'You must provide search!!'
});
    }
res.send({
    product:[]
});
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        message:'Help artical not found!!',
        title:'404',
        footerText:'Created By sandip.'
    });
})
app.get('*',(req,res)=>{
    res.render('404',{
        message:'Page not found!!',
        title:'404',
        footerText:'Created By sandip.'
    });
})
/** default page */
// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>');
// });
/** help page */
// app.get('/help',(req,res)=>{
//     res.send(
//         {
//             name:'sandip',
//             age:32
//         }
//     );
// });
/** about page */
// app.get('/about',(req,res)=>{
//     res.send("<h1>About Us </h1>");
// })

/** weather app page */
app.get('/weather',(req,res)=>{
res.send(
    {
        forecast:'50 degree celsius',
        Location :'Pune'
    }
);
});

app.listen(port,()=>{
    console.log('server is up on' + port +'.');
});