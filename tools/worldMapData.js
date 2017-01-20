const countries = require('./../resources/worldMap.json');
const geojson = require('./../resources/countries.geo.json');

const metrics = ["conversions","clicks","revenue"];
const dimensions = ["overall","clicks","impressions"];
const deviceTypes = ["desktop","tablet","mobile"];
const deviceTypesCombinator = {"desktop":1,"tablet":0.4,"mobile":0.7};

function roundIt(val,dec=4) {
    return Math.min(1,parseFloat(val.toFixed(dec)));
}

const res = {};
for (let continentCode in countries.items) {
    let continent = countries.items[continentCode];
    let cres = res[continentCode] = {name: continent.name, participants:0, solo:0, metrics:{
        conversions:{desktop:0,desktopPrev:0,tablet:0,tabletPrev:0,mobile:0,mobilePrev:0},
        clicks:{desktop:0,desktopPrev:0,tablet:0,tabletPrev:0,mobile:0,mobilePrev:0},
        revenue:{desktop:0,desktopPrev:0,tablet:0,tabletPrev:0,mobile:0,mobilePrev:0}
    }, dimensions:{
        overall:0,overallPrev:0,clicks:0,clicksPrev:0,impressions:0,impressionsPrev:0
    }};

    let deviceAggregates = deviceTypes.map(deviceType=>{
        return deviceTypesCombinator[deviceType]*Math.random();
    });
    let devAggrTot = deviceAggregates.reduce((aggr,val)=>{
        return aggr + val;
    },0);
    let deviceAggregatesContinent = deviceAggregates.map(val=>{
        return val / devAggrTot;
    });

    let combinedContinentFac = Math.random();

    let dimensionAggregates = dimensions.map(()=>{
        return Math.random();
    });
    let dimAggrTot = dimensionAggregates.reduce((aggr,val)=>{
        return aggr + val;
    },0);
    let dimensionAggregatesContinent = dimensionAggregates.map(val=>{
        return val / dimAggrTot;
    });

    for (let countryCode in continent.items) {
        let country = continent.items[countryCode];
        let pop = 0;
        switch (countryCode) {
            case 'GUF':
                pop = Math.random() * 250000;
                break;
            default:
                pop = Math.random() * geojson.features.filter(feature => {
                        return feature.properties.adm0_a3 == countryCode
                    })[0].properties.pop_est;
                break;
        }

        let ccres = {name: country.name, participants:Math.ceil(pop), metrics:{},dimensions:{}};

        deviceAggregates = deviceTypes.map(deviceType=>{
            return Math.random();
        });
        devAggrTot = deviceAggregates.reduce((aggr,val)=>{
            return aggr + val;
        },0);
        let deviceAggregatesCountry = deviceAggregates.map(val=>{
            return val / devAggrTot;
        });
        metrics.forEach(metric=>{
            ccres.metrics[metric] = {};
            deviceTypes.forEach((deviceType,deviceInd)=>{
                let fac = Math.random() * deviceAggregatesCountry[deviceInd] * deviceAggregatesContinent[deviceInd] * 5;
                ccres.metrics[metric][deviceType] = roundIt(fac * ((Math.random()*Math.random()*0.5)+0.75));
                ccres.metrics[metric][deviceType+'Prev'] = roundIt(fac * ((Math.random()*Math.random()*0.5)+0.75));
            });
        });
        ccres.solo = roundIt(1-(Math.random()*combinedContinentFac));
        dimensions.forEach((dimension,dimensionInd)=>{
            let fac = Math.random() * dimensionAggregatesContinent[dimensionInd] * 1.5;
            ccres.dimensions[dimension] = roundIt(fac * ((Math.random()*Math.random()*0.5)+0.75));
            ccres.dimensions[dimension+'Prev'] = roundIt(fac * ((Math.random()*Math.random()*0.5)+0.75));
        });

        res[countryCode] = ccres;

        cres.solo += ccres.solo*ccres.participants;
        cres.participants += ccres.participants;

        metrics.forEach(metric=> {
            deviceTypes.forEach(deviceType => {
                cres.metrics[metric][deviceType] += ccres.metrics[metric][deviceType]*ccres.participants;
                cres.metrics[metric][deviceType+'Prev'] += ccres.metrics[metric][deviceType+'Prev']*ccres.participants;
            });
        });

        dimensions.forEach(dimension => {
            cres.dimensions[dimension] += ccres.dimensions[dimension]*ccres.participants;
        });
    }
    cres.solo = roundIt(cres.solo / cres.participants);

    metrics.forEach(metric=> {
        deviceTypes.forEach(deviceType => {
            cres.metrics[metric][deviceType] = roundIt(cres.metrics[metric][deviceType] / cres.participants);
            cres.metrics[metric][deviceType+'Prev'] = roundIt(cres.metrics[metric][deviceType+'Prev'] / cres.participants);
        });
    });

    dimensions.forEach(dimension => {
        cres.dimensions[dimension] = roundIt(cres.dimensions[dimension] / cres.participants);
    });
}

var fs = require('fs');
var stream = fs.createWriteStream("./public_ir/api/mediaManager/worldMapGraph.json");
stream.once('open', function(fd) {
    stream.write(JSON.stringify(res));
    stream.end();
});
//if (LOG_RESULT)
    //console.log(JSON.stringify(cres));

console.log('done');