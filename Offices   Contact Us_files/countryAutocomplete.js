$().ready(function() {

	$("#countryInput").autocomplete(countries, {
		matchContains: 'word',
		minChars: 1
	});
	

	$('#countryInput').result(function(event, data, formatted){
		if (data) {
			//auto complete matched. 
			
			//exceptions to the regular redirect
			if ( (formatted == "American Samoa")|| (formatted == "Guam") || (formatted == "Marshall Islands, Republic of") || (formatted == "Micronesia") || (formatted == "North Mariana") || (formatted == "Palau") || (formatted == "Samoa") ) {
				location.href="http://www.esri.com/about-esri/redlands.html";				
			}
			else if (formatted == "Bermuda") {
				location.href="http://www.esri.com/about-esri/charlotte.html";
			} else if (formatted == "British Indian Ocean Territory") {
				location.href="http://www.esri.com/apps/company/contact/index.cfm?fa=distributor.lookup&country=Brit Ind Ocn Tr";				
			} else if (formatted == "Burma") {
				location.href="http://www.esri.com/apps/company/contact/index.cfm?fa=distributor.lookup&country=Myanmar";				
			} else if (formatted == "Cayman Islands") {
				location.href="http://www.esri.com/about-esri/sanantonio.html";				
			} else if ( (formatted == "Cote d'Ivoire") || (formatted == "Ivory Coast") ) {
				location.href="/apps/company/contact/index.cfm?fa=distributor.lookup&country=Cote d'Ivoire (Ivory+Coast)";				
			} else if (formatted == "Croatia, Republic of") {
				location.href="http://www.esri.com/apps/company/contact/index.cfm?fa=distributor.lookup&country=Croatia, Rep. of";				
			} else if (formatted == "Macedonia") {
				location.href="http://www.esri.com/apps/company/contact/index.cfm?fa=distributor.lookup&country=Macedonia, Former Yugoslav Republic of";				
			} else if (formatted == "Trinidad & Tobago") {
				location.href="http://www.esri.com/apps/company/contact/index.cfm?fa=distributor.lookup&country=Trinidad+%26+Tobago";				
			} else if (formatted == "United States") {
				document.getElementById('countryGoButton').style.display = "none";
				document.getElementById('stateNames').style.display = "block";
				document.getElementById('stateInput').focus();
			} else {
				location.href = "http://www.esri.com/apps/company/contact/index.cfm?fa=distributor.lookup&country=" + formatted;
			}
		}
		else {
			// must have been triggered by search() below
			// there was no match
			alert("Country name not recognized. Please try again.");
		}
				
	});
	
	$("#stateInput").autocomplete(states, {
		matchContains: 'word',
		minChars: 1
	});



	$('#stateInput').result(function(event, data, formatted){
		if (data) {
			//auto complete matched. 
			findRegionPageByName(formatted);
		}
		else {
			// must have been triggered by search() below
			// there was no match
			alert("State name not recognized. Please try again.");
		}
				
	});

	
	
});

function submitTrigger() {
	$('#countryInput').search();
}

function submitTrigger2() {
	$('#stateInput').search();
}
