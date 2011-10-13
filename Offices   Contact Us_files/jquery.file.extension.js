$("document").ready(function() {
	//Searchs all "a" tags that have the href attribute which ends with the specified string.
	$("a[href]").not(":has('img')").not(".noFileInfo").each(function() {
		//Get the value of a href and set it to a variable
		//alert($(this).html());
		var sHref = $(this).attr("href");
		//Get the length of href's value
		var iHrefLength = sHref.length;
		//Get the index position of the final period in the href value.
		var iDot = sHref.lastIndexOf(".");
		//set the value of a new variable to the the text that follows the period to the end of the string (the file extension).
		var sExtension = sHref.substring(iDot+1,iHrefLength);
		//Make the value all uppercase
		sExtension = sExtension.toUpperCase();
		//If the span with fileInfo is there already
		//The following tests to see if there is a page specified in a PDF link. If so, then change the extension value to PDF.
		var regExp = /PDF([?#&][\w]+[=]\d)+$/;
		//var bCondition = regExp.test(sExtension);
		if(regExp.test(sExtension)) {
			sExtension = 'PDF';
		}
		//The following tests to see if the extension matches the content of the <a> tag. If so, return null
		var sText = $(this).text();
		//alert("Text: " + sText + ". Extension: " + sExtension);
		if(sText == sExtension) {
			return;
		}
		//If the extension is any one of the listed file types, execute code
		switch (sExtension) {
			case 'PDF':
			case 'MP3':
			case 'MP4':
			case 'WMV':
			case 'DOC':
			case 'DOCX':
			case 'ZIP':
			case 'DMG': //MAC
			case 'SIT': //MAC
			case 'TAR': //Linux
			case 'GZ': //Linux
				if ($(this).next("span").attr("class") == "fileInfo" || $(this).prev("span").attr("class") == "leftCorners") {
					return; //Do Nothing
				}
				//if the 
				else if ($(this).next("span").attr("class") == "pdf") {
					$(this).next().attr("class","fileInfo");
				}
				else {
					$(this).after('&nbsp;<span class="fileInfo">[' + sExtension +']</span>');
				}
				break;
			case 'XLS':
				if ($(this).next("span").attr("class") == "fileInfo") {
					return; //Do Nothing
				}
				//if the 
				else if ($(this).next("span").attr("class") == "pdf") {
					$(this).next().attr("class","fileInfo");
				}
				else {
					$(this).after('&nbsp;<span class="fileInfo">[EXCEL]</span>');
				}
				break;
			case 'PPT':
				if ($(this).next("span").attr("class") == "fileInfo") {
					return; //Do Nothing
				}
				//if the 
				else if ($(this).next("span").attr("class") == "pdf") {
					$(this).next().attr("class","fileInfo");
				}
				else {
					$(this).after('&nbsp;<span class="fileInfo">[POWERPOINT]</span>');
				}
				break;
			case 'MOV':
			case 'AVI':
				if ($(this).next("span").attr("class") == "fileInfo") {
					return; //Do Nothing
				}
				//if the 
				else if ($(this).next("span").attr("class") == "pdf") {
					$(this).next().attr("class","fileInfo");
				}
				else {
					$(this).after('&nbsp;<span class="fileInfo">[VIDEO]</span>');
				}
				break;
			case 'SWF':
				if ($(this).next("span").attr("class") == "fileInfo") {
					return; //Do Nothing
				}
				//if the 
				else if ($(this).next("span").attr("class") == "pdf") {
					$(this).next().attr("class","fileInfo");
				}
				else {
					$(this).after('&nbsp;<span class="fileInfo">[FLASH]</span>');
				}
				break;
			default:
				break;
		}
	});
});