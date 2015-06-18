$(function(){

	//クリック時に全選択
	$("#RshPanel").children("textarea").click(function(){
	    $(this).select();
  	});

$("#RshPanel").on("reloadPanel", function(ev){
	if (document.info.RshCurrent == undefined)
		return

	// テキストエリアのリロード
	var url = document.config.host.value + 'board/';
	//var url = 'http://kifcloud.info/board/';
	if ( document.info.RshPrev.value && document.info.LastMoveCode.value) {
		url = url + document.info.RshPrev.value + '/' + document.info.LastMoveCode.value;
	} else {
		url = url + document.info.RshCurrent.value;
	}
	$("#RshPanel").children("textarea").html(url);

	// twitterシェアボタンのリロード
	var tweetinput = '<a href="https://twitter.com/share" class="twitter-share-button"  data-url="'+url+'" data-text="【#将棋局面シェア】" data-lang="ja" data-count="none">局面をツイート</a>';
	$.when(
			$("#RshPanel").children(".tweetButtonWrapper").html(tweetinput)
	).done(function(){
			//console.log('set twitter = ' + url);
			twttr.widgets.load();
	});
	});

});
