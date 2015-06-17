$(function(){

	//クリック時に全選択
	$("#RshPanel").children("textarea").click(function(){
	    $(this).select();
  	});

$("#RshPanel").on("reloadPanel", function(ev){
	if (document.info.RshCurrent == undefined)
		return

	// テキストエリアのリロード
	//var url = getHost() + 'board/' + document.info.RshCurrent.value
	var url = document.config.host.value + 'board/' + document.info.RshCurrent.value
	$("#RshPanel").children("textarea").html(url);

	// twitterシェアボタンのリロード
	var tweetinput = '<a href="https://twitter.com/share" class="twitter-share-button"  data-url="'+url+'" data-text="【#将棋局面シェア】" data-lang="ja" data-count="none">局面をツイート</a>';
	$("#RshPanel").children(".tweetButtonWrapper").html(tweetinput);
	twttr.widgets.load();
	});

});
