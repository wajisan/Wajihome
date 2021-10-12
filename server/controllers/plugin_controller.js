const axios = require('axios');
const cheerio = require('cheerio');
const sendController = require('./send_controller');

const param = {
    sport : {
        maxPlaces : 200,
        url : "https://www.fitnesspark.fr/club/villiers-sur-marne/"
    },
    transport : {
        url : "https://www.montrain.com/fr-FR/horaires/villierssurmarneleplessistrevise-haussmannsaintlazare"
    },
    traffic : {
        autoroutes : ["A6", "A86", "A4"],
        url : "http://www.sytadin.fr/sys/fermetures_nocturnes.jsp.html"
    },
    meteo : {
        domain : "https://www.lameteoagricole.net/",
        url : "https://www.lameteoagricole.net/meteo-heure-par-heure/Villiers-sur-Marne-94350.html"
    },
    maps : {
        url : "https://www.google.fr/search?q=itin%C3%A9raire+villiers-sur-marne+94+morangis+91&oq=itin%C3%A9raire+villiers-sur-marne+94+morangis+91&aqs=chrome..69i57.10450j0j7&sourceid=chrome&ie=UTF-8"
    }
}

exports.getTraffic = function(req, res, next) {
    axios(param.traffic.url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        let tmpClosing = [];
        const selects = $('#fermeture_nocturne tbody .tr_grey td[style^="text-align"]', html); 
        selects.each(function(i, element) {
            
            let curr = $(this).text();
            if (i % 2 == 0) {
                for (let ite = 0; ite < param.traffic.autoroutes.length; ite++) {
                    let elem = param.traffic.autoroutes[ite];
                    if (curr.includes(elem)) {
                        let closing = {
                            axe : curr,
                            description : selects.eq(i + 1).text(),
                        }
                        tmpClosing.push(closing);
                        return;
                    }
                }
            }
        });
        if (tmpClosing.length > 0) {
            res.status(200).json({
                title: "Success",
                traffics: tmpClosing
            });
        }
    }
    ).catch(err => res.status(500).json({title: "Error",error: err}));
}

exports.getMeteo = function(req, res, next) {
    axios(param.meteo.url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        let tmpPeriods = [];
        const selects = $('#meteoHour tbody tr', html);
        if (selects.length == 11) {
            for (let ite = 0; ite <= 2; ite++) {
                let period = {
                    time : selects.eq(1).find('td').eq(ite).text(),
                    img : param.meteo.domain + selects.eq(2).find('td:nth-child('+(ite + 1)+') img').attr('src'),
                    degree : selects.eq(3).find('td').eq(ite).text(),
                    rains : selects.eq(4).find('td').eq(ite).text(),
                    wind : selects.eq(7).find('td').eq(ite).text(),
                }
                tmpPeriods.push(period);
            }
        }
        if (tmpPeriods.length > 0) {
            res.status(200).json({
                title: "Success",
                meteo: tmpPeriods
            });
        }
    }
    ).catch(err => res.status(500).json({title: "Error",error: err}));
}

exports.getTransport = function(req, res, next) {
    axios(param.transport.url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        let tmpTrains = [];
        $('.h-j', html).each(function() {
            let train = {
                time : $(this).find('.time-c').first().text(),
                name : $(this).find('.t-data-i').last().text().replace("RER ", ""),
                arrive : $(this).find('.time-c').last().text()
            }
            tmpTrains.push(train);
        });
        if (tmpTrains.length > 0) {
            res.status(200).json({
                title: "Success",
                transports: tmpTrains
            });
        }
    }
    ).catch(err => res.status(500).json({title: "Error",error: err}));
}

exports.getSport = function(req, res, next) {
    axios(param.sport.url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        $('.compteur_comptipix .compteur', html).each(function() {
            res.status(200).json({
                title: "Success",
                sport: param.sport.maxPlaces - parseInt($(this).text())
            });
        })
    }
    ).catch(err => res.status(500).json({title: "Error",error: err}));
}

exports.getMaps = async function(req, res, next) {
    await axios
    .get(param.maps.url, { headers: { 'User-Agent': 'Mozilla/5.0'}})
    .then(response => {
        console.log('try');
        const $ = cheerio.load(response.data);
        fs.writeFile('google.txt', response.data, function(err){
            if (err) return console.log(err);
            console.log('DONE FILE');
        });
        let r = {};
        $("span > div:contains('km')").each((i, elem) => {
            console.log('found !');
            if (elem.childNodes.length >= 3 && elem.childNodes[1].childNodes.length >= 1) {
                r.duration = elem.childNodes[1].childNodes[0].data.replace(/\uFFFD/g, ' ');
                r.distance = elem.childNodes[2].data.replace(/\uFFFD/g, ' ');
            }

        });
        console.log('end');
        res.status(200).json({
            title: "Success",
            maps: r
        });
    }
    ).catch(err => {res.status(500).json({title: "Error",error: err}); console.log('--------------------------------------------'); console.log(err);});
}
