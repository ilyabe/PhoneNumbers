 var tickers = new Array();
 var intervals = new Array();
   intervals[0] = '1';
   intervals[1] = '92';
   intervals[2] = '183';
   intervals[3] = '366';

   tickers[0] = '$NYA';
   tickers[1] = '$COMP';
   tickers[2] = '$SPX';
 var currentticker =  '$NYA';
 var currentinterval = 1;
 function SwitchSummaryChart(pos){
  for (i=0; i<tickers.length;  i++ ) {
   document.getElementById('summarytab'+i).className = 'tab';
  }
  document.getElementById('summarytab'+pos).className = 'tab activetab';
  document.getElementById('fcsummarychart').src = 'http://chart.financialcontent.com/Chart?width=230&vucolor=008000&bvcolor=FFFFFF&gtcolor=336666&Account=bostonherald&bgcolor=null&gbcolor=FFFFFF&Client=bostonherald&watermark=null&brcolor=666666&pvcolor=F46D3C&ibcolor=null&vdcolor=FF0000&wmalpha=50&volume=1&fillalpha=60&height=110&lncolor=666666&arcolor=null&txcolor=000000&itcolor=000000&grcolor=EEEEEE&shcolor=336666&shwidth=1&ticker=' + tickers[pos] + '&interval=' + currentinterval;
  currentticker = tickers[pos];
 }
	
 function UpdateChartInterval(interval) {
  for (i = 0; i <= (intervals.length - 1 ); i++) {
   document.getElementById('interval'+ intervals[i]).className = '';
  }
  document.getElementById('fcsummarychart').src = 'http://chart.financialcontent.com/Chart?width=230&vucolor=008000&bvcolor=FFFFFF&gtcolor=336666&Account=bostonherald&bgcolor=null&gbcolor=FFFFFF&Client=bostonherald&watermark=null&brcolor=666666&pvcolor=F46D3C&ibcolor=null&vdcolor=FF0000&wmalpha=50&volume=1&fillalpha=60&height=110&lncolor=666666&arcolor=null&txcolor=000000&itcolor=000000&grcolor=EEEEEE&shcolor=336666&shwidth=1&ticker=' + currentticker + '&interval=' + interval;
  document.getElementById('interval'+interval).className= 'active';
  currentinterval = interval;
 }