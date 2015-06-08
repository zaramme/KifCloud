/////////////////////////////////////////
// API通信を制御するメソッド群
/////////////////////////////////////////
$(function(){
	debug("api.jsを読み込みました");
	});

function apiGetBoardState(rsh, lastMove, callback){
	var url = API_RSH + "/" + (rsh===null ? "" : rsh) + (lastMove==null ? "" : "/" + lastMove );
	$.ajax({
		url: url,
		dataType: 'json'
	})
	.done(function(boardState) {
		callback(boardState);
	})
	.fail(function() {
	});
}

function apiGetBoardInfo(rsh, lastMove, callback){
	var url = API_RSH + "/" + (rsh===null ? "" : rsh) + (lastMove==null ? "" : "/" + lastMove );
	$.ajax({
		url: url,
		dataType: 'json'
	})
	.done(function(boardData) {
		callback(boardData.Info);
	})
	.fail(function() {
	});	
}