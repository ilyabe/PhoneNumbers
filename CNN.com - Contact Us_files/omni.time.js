var cnnCurrDay; var cnnOmniHour; var cnnOmniTime;
if (typeof(cnnCurrMin) != "undefined") {
var cnnOmniMint = '00';
if (cnnCurrMin>=15&&cnnCurrMin<30) {
cnnOmniMint='15';
} if (cnnCurrMin>=30&&cnnCurrMin<45) {
cnnOmniMint='30';
} if (cnnCurrMin>=45&&cnnCurrMin<60) {
cnnOmniMint='45';
}}
if (typeof(cnnCurrHour) != "undefined") {
if (cnnCurrHour<10) {
var cnnOmniHour = '0' + cnnCurrHour;} 
else {cnnOmniHour = cnnCurrHour;}} 
if (typeof(cnnCurrHour) != "undefined"){var cnnOmniTime = cnnOmniHour + ":" + cnnOmniMint;}
