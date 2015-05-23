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