rsi_secure = (location.protocol=='https:') ? 1 : 0;
rsi_ju  = "http" + (rsi_secure ? "s" : "") + "://ads.revsci.net/adserver/ako?rsi_random=" + ("" + Math.random()).substring(2,11);
function rsi_ap(n,v) { if (typeof(v) != "undefined") { rsi_ju += "&" + n + "=" + encodeURIComponent(v); } }
var w = window;
rsi_ap("rsi_pub", w.rsi_pub);
rsi_ap("rsi_site", w.rsi_site);
rsi_ap("rsi_width", w.rsi_width);
rsi_ap("rsi_height", w.rsi_height);
rsi_ap("rsi_no_dash", w.rsi_no_dash);
rsi_ap("rsi_secure", w.rsi_secure);
rsi_ap("rsi_pub_cw", w.rsi_pub_cw);
rsi_ap("rsi_url", location.href);
rsi_ap("rsi_referrer", document.referrer);
rsi_ap("rsi_title", document.title);
rsi_ap("rsi_inf", w.self!=w.top?1:0);
document.write("<script type=\"text/javascript\" src=\"" + rsi_ju + "\"><" + "/script>");
