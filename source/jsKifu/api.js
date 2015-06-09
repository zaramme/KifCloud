$(function(){
debug("jsKifu/api.jsを読み込みました");
});

function apiLoadKifu(kifuID){
	fileurl = '/api/kifu/' + kifuID;
	debug("api通信：api.kifu param ... " + kifuID);

	$.ajax({
		url: fileurl,
		dataType: 'json',
		success: function(data){
				debug("--棋譜が読み込まれました");
				setMoveList(data);
		},
	});
}

function apiGetKifuInit(callback){
	var url = 'api/board/';
	$.ajax({
		url: url,
		dataType: 'json'
	})
	.done(function(boardState) {
		callback(boardState);
	})
	.fail(function() {
		console.log("apiロードに失敗しました。resource= " + rsh );
	});
}
