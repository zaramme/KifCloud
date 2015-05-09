$(function(){
debug("panelKifucount.jsを読み込みました")

function apiLoadKifuCount(){
	fileurl = '/api/kifu/count/';
	debug("api通信：api.kifu.count");

	$.ajax({
		url: fileurl,
		dataType: 'json',
		success: function(data){
				debug("--棋譜総数が読み込まれました" + data.count);
				$("#PanelKifuCount>.info-box-number").text(data.count);
		},
	});
}

$("#PanelKifuCount").ready(function(){
	apiLoadKifuCount();
});

});