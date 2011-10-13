var cnnWeather = (typeof Class == "object") ? Class.create() : {};
cnnWeather = {
	config: {
		activated: true,
		weatherCdnPath: 'http://i.cdn.turner.com/cnn/.element/img/3.0/weather/',
		weatherUrl: 'http://svcs.cnn.com/weather/getForecast',
		iconSmallPath: '01/',
		iconLargePath: '03/',
		shortName: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
		weatherDivs: ['cnnLWPWeather', 'user_weather'],
		weatherLink: 'http://weather.cnn.com/weather/',
		weatherLinkIntl: 'http://weather.edition.cnn.com/weather/intl/',
		forecastLink: '',
		requestTimer: '',
		requestAttempts: 30, //15 seconds
		editionPref: ''
	},
	
	data: {
		celsius: false,
		locCode: '',
		zipCode: ''
	},

	init: function(){
		if(this.config.activated){
			this.config.requestTimer = setInterval(this.testCSIReady, 500);
		};
	},
	
	testCSIReady: function(){
		//console.log('is csi ready?');
		cnnWeather.config.requestAttempts--;
		if(typeof CSIManager.getInstance !== 'undefined'){
			cnnWeather.setData();
			clearInterval(cnnWeather.config.requestTimer);				
		} else if(typeof CSIManager.getInstance === 'undefined' && cnnWeather.config.requestAttempts > 0){
				cnnWeather.testCSIReady();
		} else {
			//console.log('there was a problem intiating the weather service. Requests have timed out');
		}
	},
	
	setData: function(){
		//set weather data
		//console.log('inside set data...');		
		
		if(typeof CNN_getCookies === 'function'){
			var c = CNN_getCookies();
			var lwpCookie = c['lwp.weather'] || null;
			
			if(c['default.temp.units']){
				this.data.celsius = c['default.temp.units'];
			} else {
				if(location.hostname.indexOf('edition') > -1){
					this.data.celsius = true;
				} else {
					this.data.celsius = false;
				}
			};
			
			//console.log('celsius preference: ' + this.data.celsius);
			
			if(lwpCookie){
				var locationArr = unescape(lwpCookie).split('|');
				var weatherLocParse = locationArr[0];
				if (lwpCookie.indexOf('~') == -1) {
					weatherLocParse = lwpCookie.replace('|', '~');
				}
				var lwpDataArr = locationArr[0].split('~');
				this.data.locCode = lwpDataArr[0];
				this.data.zipCode = lwpDataArr[1];
				this.requestWeather();
			} else {
				//call weather service with random zip code
				var randomCity = this.randomCityZip();
				this.data.zipCode = randomCity[0];
				this.data.locCode = randomCity[1];
				this.requestWeather();
				}
				
			if(c['SelectedEdition'] && c['SelectedEdition'] == 'edition'){
				this.config.forecastLink = this.config.weatherLinkIntl + 'forecast.jsp?&zipCode=' + this.data.zipCode;
			} else {
				this.config.forecastLink = this.config.weatherLink + 'forecast.jsp?zipCode=' + this.data.zipCode;
			};
				
		} else {
			//console.log('There was a problem loading the document.  Error: Main.js not included?');
		}
	},
	
	requestWeather: function(){
		//console.log('request weather being called...');
		var requestUrl = this.config.weatherUrl;
		var requestArgs = 'mode=json_html&zipCode=' + this.data.zipCode + '&locCode=' + this.data.locCode + '&celcius=' + this.data.celsius;
		var callObj = {url: requestUrl, args: requestArgs, domId: false, funcObj: this.requestHandler, breakCache: true};
		CSIManager.getInstance().callObject(callObj, 'requestWeather');
	},
	
	requestHandler: function(requestObj){
		//console.log('requestHandler being called');
		if(typeof requestObj === 'object'){
			// we should be dealing with a json object
			// adjust props for ease-of-use
			cnnWeather.data = requestObj[0];
			//add short names to object
			for(var i = 0; i< cnnWeather.data.forecast.days.length;i++){
				//add short names
				var day = parseFloat(cnnWeather.data.forecast.days[i].dayDate.day);
				cnnWeather.data.forecast.days[i].shortName = cnnWeather.config.shortName[day];
				//add average
				var hi = parseFloat(cnnWeather.data.forecast.days[i].high);
				var lo = parseFloat(cnnWeather.data.forecast.days[i].low);
				cnnWeather.data.forecast.days[i].average = Math.floor((hi + lo) / 2);
				//convert gif images to pngs
				cnnWeather.data.forecast.days[i].icon = cnnWeather.gif2png(cnnWeather.data.forecast.days[i].icon);
			};
			//console.log(cnnWeather.data);
			cnnWeather.ui();
		} else {
			//console.log('There was a problem with the data response');
		}
	},

	ui: function(){
		for(i=0; i<cnnWeather.config.weatherDivs.length; i++){
			var el = cnnWeather.config.weatherDivs[i];
			var elExists = $(el);
			if(typeof cnnWeather.html[el] === 'function' && elExists){
				cnnWeather.html[el].apply();
			} else {
				//console.log('There was a problem accessing the view element' + el);
			};
		};
	},
	
	randomCityZip: function(){
		if(location.hostname.indexOf('edition') > -1){
			var funnyCities = ['336736767676'];
			var funnyLoc = ['EGLL'];
			var dataArray = [funnyCities[0], funnyLoc[0]];
			return dataArray;
		} else {
		var funnyCities = ['27374', '95614', '87901', '74446', '31041', '65570', '29112', '79031', '25902'];
		var funnyLoc = ['NC26' , 'CAPL', 'NM12', 'MUSX', '09GA', 'TBN', 'USSC08', '30TX', 'BLF'];
		var selectRandom = Math.floor(Math.random() * funnyCities.length);
		var dataArray = [funnyCities[selectRandom], funnyLoc[selectRandom]];
		return dataArray;
		}
	},
	
	gif2png: function(ext){
		var ext = ext.split('.');
		ext = ext[0];
		ext += '.png';
		return ext;
	}
	
};

cnnWeather.html = {};
cnnWeather.html.cnnLWPWeather = function(){
	if(cnnWeather.data.currentConditions.valid == false){
		cnnWeather.data.currentConditions.temperature = '--';
		cnnWeather.data.currentConditions.icon = 'na_sm'
	}
	var currentTemp = (cnnWeather.data.currentConditions.temperature_S === 'N/A')?'<span style="font-size: 50%;">N/A</span>':cnnWeather.data.currentConditions.temperature_S + '&deg;';
var html = 	'<div class="cnn_ftrwthr1">';
	html +=	'	<a href="' + cnnWeather.config.forecastLink + '" title=""><img src="' + cnnWeather.config.weatherCdnPath + cnnWeather.config.iconLargePath + cnnWeather.data.currentConditions.icon + '.png" width="54" height="47" alt="" class="cnn_ie6png" border="0"></a>';
	html += '</div>';
	html += '<div class="cnn_ftrwthr2"><div class="cnn_ftrwthr3">' + currentTemp + '</div>';
	html += '<div class="cnn_ftrwthr4"><div>HI ' + cnnWeather.data.forecast.days[0].high + '&deg;<span style="padding-left:7px">LO ' + cnnWeather.data.forecast.days[0].low + '&deg;</span></div>';
	html += '<div style="clear:left; line-height: 13px"><span style="padding-right:6px"><strong>' + cnnWeather.data.location.city + ', ' + cnnWeather.data.location.stateOrCountry + '</strong>';
	html += '</span><a href="' + cnnWeather.config.forecastLink + '">Weather forecast</a></div></div></div>';
	// insert
	var weatherDiv = $('cnnLWPWeather');
	$('cnnLWPWeather').innerHTML = html;
	$('cnnLWPWeather').style.visibility = 'visible';
};

cnnWeather.html.user_weather = function(){
	//console.log('html for cnnProfileWeather called');
	$('weather_act').innerHTML = cnnWeather.data.location.city + ', ' + cnnWeather.data.location.stateOrCountry;
	$('weather_format_img').href = cnnWeather.config.forecastLink;
var currentTemp = (cnnWeather.data.currentConditions.temperature_S === 'N/A')?'<span style="font-size: 50%;">N/A</span>':cnnWeather.data.currentConditions.temperature_S + '&deg;';
var html = 	'';
	html +=	'<a href="' + cnnWeather.config.forecastLink + '" title=""><img class="cnn_ie6png" src="' + cnnWeather.config.weatherCdnPath + cnnWeather.config.iconLargePath + cnnWeather.data.currentConditions.icon + '.png" width="57" height="47" alt="Current Weather" ></a>';
	$('weather_icon').innerHTML = html;

	html = '';
	html += '<h1>' + currentTemp + '</h1>';
	html += '<h2 id="weather_hi">HI ' + cnnWeather.data.forecast.days[0].high + '&deg;</h2>';
	html +=	'<h2 id="weather_lo">LO ' + cnnWeather.data.forecast.days[0].low + '&deg;</h2>';
	$('weather_temp').innerHTML = html;
	
	html = '';
	html +=	'<div class="wth_3daycol"><img class="cnn_ie6png" src="' + cnnWeather.config.weatherCdnPath + cnnWeather.config.iconSmallPath + cnnWeather.data.forecast.days[1].icon + '" width="21" height="17" alt="">';
	html +=	'<div class="w_day">' + cnnWeather.data.forecast.days[1].shortName + '</div><div class="w_temp">'+ cnnWeather.data.forecast.days[1].average + '&deg;</div></div>';
	
	html +=	'<div class="wth_3daycol"><img class="cnn_ie6png" src="' + cnnWeather.config.weatherCdnPath + cnnWeather.config.iconSmallPath + cnnWeather.data.forecast.days[2].icon + '" width="21" height="17" alt="">';
	html +=	'<div class="w_day">' + cnnWeather.data.forecast.days[2].shortName + '</div><div class="w_temp">'+ cnnWeather.data.forecast.days[2].average + '&deg;</div></div>';
	
	html +=	'<div class="wth_3daycol_last"><img class="cnn_ie6png" src="' + cnnWeather.config.weatherCdnPath + cnnWeather.config.iconSmallPath + cnnWeather.data.forecast.days[3].icon + '" width="21" height="17" alt="" >';
	html += '<div class="w_day">' + cnnWeather.data.forecast.days[3].shortName + '</div><div class="w_temp">'+ cnnWeather.data.forecast.days[3].average + '&deg;</div></div><div class="clear"></div>';
	
	$('weather_3day').innerHTML = html;
	$('user_weather').style.visibility = 'visible';
};
Event.observe(window, 'load', function() {
	cnnWeather.init();
});
