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
				setMoveList(data);
		},
	})
	.fail(function() {
		modalError();
	});
}

function apiGetKifuInit(callback){
	var url = '/api/board/';
	$.ajax({
		url: url,
		dataType: 'json'
	})
	.done(function(boardState) {
		callback(boardState);
	})
	.fail(function() {
		modalError();
	});
}
