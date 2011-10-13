// global object that will be used to map a zip code to an RO
// structure is { "<zip_code>":"<three_letter_RO_abbr>", "<zip_code>":"<three_letter_RO_abbr>", etc... }
var zipLookUp; 
// global object that will be used to map an RO abbr. to a name that matches an RO html page on esri.com
var regionLookUp = { // global object to map RO abbr. to city name that matches 
	'phl': 'philadelphia', 'den': 'denver', 'sa': 'sanantonio', 
	'bos': 'boston', 'stl': 'stlouis', 'oly': 'olympia', 
	'ca': 'redlands',	'chl': 'charlotte', 'min': 'minneapolis', 
	'dc': 'washingtondc'
};

function init(){
	// read in the zip code data and store it in the zipLookUp object
	dojo.xhrGet({
		url: "locations_Flashfiles/zips_regions.json",
		handleAs: "json",
		load: function(data) {
			//console.log(data);
			zipLookUp = data;
		}
	});
	
	// set up an event listener to capture the submit event from the form
	//dojo.connect(dojo.byId("zipSearch"), "onsubmit", findRegionPage);
}

function findRegionPage(mzip) {
	// stop the standard browser form submit events
	//dojo.stopEvent(evt);
	if (mzip.length != 5) { 
		alert("Zip code must be five digits."); 
		return;
	}
	var zip = parseInt(mzip);
	// figure out which zip code we're looking for
	//var zip = dojo.byId("zipCode").value;
	
	// zip codes have to be five digits...
	
	
	// find the region that corresponds to the zip code
	var regionAbbr = zipLookUp[zip];
	
	// if we didn't find a region, return an error
	if (!regionAbbr) {
		alert('Unknown zip code. Please enter a different zip code.');
		return;
	} else {
		// use the three letter RO abbr. to get an esri.com friendly RO name
		var regionToDisplay = regionLookUp[regionAbbr];
		
		// build our redirect URL
		var regionUrl = "http://dev.esri.com/about-esri/" + regionToDisplay + ".html";
		
		// redirect to the RO page that corresponds to the zip code the user entered
		window.location = regionUrl;
	}
	
	console.log("zip code is: ", zip, ' ', evt);
}

	function findRegionPageByName(mState) {
		var regionToDisplay = "";

		if (mState == 'Connecticut' || mState == 'Maine' || mState == 'Massachusetts' || mState == 'New Hampshire' || mState == 'New York (Upstate)' || mState == 'Rhode Island' || mState == 'Vermont') {	
			regionToDisplay = "boston";		
		}
		else if (mState == 'Alabama' || mState == 'Florida' || mState == 'Georgia' || mState == 'North Carolina' || mState == 'South Carolina' || mState == 'Tennessee' || mState == 'Virginia') {	
			regionToDisplay = "charlotte";		
		}
		else if (mState == 'Arizona' || mState == 'Colorado' || mState == 'New Mexico' || mState == 'Utah' || mState == 'Wyoming') {	
			regionToDisplay = "denver";		
		}
		else if (mState == 'Illinois' || mState == 'Michigan' || mState == 'Minnesota' || mState == 'North Dakota' || mState == 'South Dakota' || mState == 'Wisconsin') {	
			regionToDisplay = "minneapolis";		
		}
		else if (mState == 'Alaska' || mState == 'Idaho' || mState == 'Montana' || mState == 'Oregon' || mState == 'Washington') {	
			regionToDisplay = "olympia";		
		}
		else if (mState == 'Delaware' || mState == 'Maryland' || mState == 'New Jersey' || mState == 'New York City and Long Island' || mState == 'Pennsylvania' || mState == 'West Virginia')
		{
			regionToDisplay = "philadelphia";
		}
		else if (mState == 'California' || mState == 'Hawaii' || mState == 'Nevada') {	
			regionToDisplay = "redlands";		
		}
		else if (mState == 'Louisiana' || mState == 'Mississippi' || mState == 'Oklahoma' || mState == 'Texas') {	
			regionToDisplay = "sanantonio";		
		}
		else if (mState == 'Arkansas' || mState == 'Indiana' || mState == 'Iowa' || mState == 'Kansas' || mState == 'Kentucky' || mState == 'Missouri' || mState == 'Nebraska' || mState == 'Ohio') {	
			regionToDisplay = "stlouis";		
		}
		else if (mState == 'District of Columbia' || mState == 'Washington D.C.')
		{
			regionToDisplay = "washingtondc";
		}
		else
		{
			alert('Unknown state. Please select another state.');
			return;
		}
		
		// build our redirect URL
		var regionUrl = "http://www.esri.com/about-esri/" + regionToDisplay + ".html";
		
		// redirect to the RO page that corresponds to the zip code the user entered
		window.location = regionUrl;
	
	}

dojo.addOnLoad(init);