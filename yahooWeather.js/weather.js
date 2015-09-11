// RSSの読み取り
// 画面は自分で作りましょう

// モジュールの取り込み
var http = require('http'); 
var parseString = require('xml2js').parseString;;
var requestfunction = require('request');

var extractJSON = "";

// header
var htmlHeader = '<!DOCTYPE html>\
<html lang="ja">\
<head>\
  <meta charset="utf-8">\
  <title>京都の週間天気</title>\
</head>\
<body>\
<div class="content">\
<h1>weekl wheather</h1>\
<h2>京都府南部の天気は</h2>';

// footer
var htmlFooter = '</div></body></html>';

// body
var htmlBody = '';

// 「<」や「>」、「&」といった文字列をエンティティに変換する
function escapeHtmlSpecialChar(html) {
  if (html === undefined) {
    return '';
  } else {
    html = html.replace(/&/g, '&amp;');
    html = html.replace(/</g, '&lt;');
    html = html.replace(/>/g, '&gt;');
    return html;
  }
};

// http.Serverオブジェクトを作成する
var server = http.createServer(onRequest);

// requestイベントハンドラを定義する
function onRequest(request, response) {
  // リクエストされたパスが「/」以外の場合、404エラーを返す
  if (request.url != '/') {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Error 404: Not Found.');
    return;
  }
 
  // Yahoo!Japan 天気予報 RSS
  var RSS = "http://rss.weather.yahoo.co.jp/rss/days/6110.xml";

  // RSSの加工
  requestfunction(RSS, function (error, rssresponse, body) {
    if (!error && rssresponse.statusCode == 200) {
      analyzeRSS(body);
      //console.log(extractJSON);
      response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
      response.write(htmlHeader);
      response.write(htmlBody);
      response.write(htmlFooter);
      response.end();
    }
  });
  
 // console.log(items);     
  return;
}

function analyzeRSS(xml) {
  // XMLをJSのオブジェクトに変換
  // parseStringtoJSON()
  parseString (xml, function (err, obj) {
    if (err) {
      console.log(err);
      return 0;
    }
   
    // console.log(JSON.stringify(obj));
    var items = obj.rss.channel[0].item;
    for (var i in items) {
      var item = items[i];
      htmlBody += '<p>' + item.title + '</p>';
      // console.log(item);
    }
  })
}

// 待ち受けするポートとアドレスを指定
var PORT = 8080;
var ADDRESS = '127.0.0.1';

// 指定したポートで待ち受けを開始する
server.listen(PORT, ADDRESS);
console.log('Server running at http://' + ADDRESS + ':' + PORT + '/');
