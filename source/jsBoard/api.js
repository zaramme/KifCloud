/////////////////////////////////////////
// API通信を制御するメソッド群
/////////////////////////////////////////

const HOST='';

const BOARD_INIT = HOST + "/board/";
const BOARD_LOAD = HOST + "/board/";

const API_DIR = HOST + "/api";
const API_RSH = API_DIR + "/board";
const API_MOVE = API_DIR + "/rsh/";

const IMG_DIR = HOST + "/public/img/jsBoard";


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