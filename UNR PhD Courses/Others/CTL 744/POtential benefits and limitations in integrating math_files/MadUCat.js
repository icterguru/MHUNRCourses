var $maducat_debug = 0;
var $skipMadUCat;
var $maducat_maxlen = 2000;
var $maducat_VERBOSE = $maducat_debug;



if ($maducat_debug) {
  if (window.rsinetsegs == null || rsinetsegs.constructor != Array) {
      rsinetsegs = ['1','2','3'];
  } else if (rsinetsegs.length <= 0) {
      rsinetsegs = ['1','2','3'];
  } else if (rsinetsegs.length == 1) {
    rsinetsegs[1] = "_1";
    rsinetsegs[2] = "_2";
    rsinetsegs[3] = "_3";
  }
}


maducat_main();

function maducat_main() {
  if (!$skipMadUCat) {
    if (rsinetsegs.length > 0) {
      var version = 1;
      var delimiter = '&';
      var expiration = 2592000000;

      var today = new Date();
      var month = today.getMonth() + 1;
      month += "";
      if (1 == month.length) {
        month = "0" + month;
      }
      var date = today.getDate() + "";
      if (1 == date.length) {
        date = "0" + date;
      }

      var cookie = version;
      cookie += delimiter;
      cookie += month;
      cookie += date;

      for (var i = 0; i < rsinetsegs.length; i++) {
        if ((cookie.length + rsinetsegs[i].length + 1) < $maducat_maxlen) {
          cookie += delimiter;

          cookie += rsinetsegs[i].substring(rsinetsegs[i].indexOf("_")+1);
        }
      }

      maducat_setCookie('MADUCAT', cookie, new Date(today.getTime()+expiration));
      $skipMadUCat = 1;
    }
  }
}


function maducat_setCookie(nm,vl,expDt) {
    var dm = document.domain.split('.');

    var ckAttr = new Array(nm+'='+vl,'path=/','domain=.'+dm[dm.length-2]+'.'+dm[dm.length-1]);
    if (expDt) ckAttr.push('expires='+expDt.toGMTString());
    document.cookie = ckAttr.join(";");
    if ($maducat_VERBOSE) document.write ("Final Cookie string: '",ckAttr.join(";"),"'<br/>\n");
}
