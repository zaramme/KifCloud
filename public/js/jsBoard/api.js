/////////////////////////////////////////
// API通信を制御するメソッド群
/////////////////////////////////////////
$(function(){
	debug("api.jsを読み込みました");
	});

function apiGetBoardState(rsh,callback){
	var url = API_RSH + "/" + (rsh===null ? "" : rsh) + (lastMove==null ? "" : "/" + lastMove );
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

function apiReload(rsh){
	var methods = new apiMethods();

	moveAllPieceInDock();
	$.ajax({
		url: API_RSH + "/" + rsh,
		dataType: 'json',
		success: function(data){
			debug("jsonを取得しました");
			methods.constructBoardFrom(data);
			document.info.rsh.value = data.Rsh
			IsBoardInit =true;
		}
	}).then(function(){ 
		refreshClickablePieceSetting();
	});

}

function apiReloadwithMoveCode(rsh, moveCode){
	var methods = new apiMethods();

	moveAllPieceInDock();
	$.ajax({
		url: API_RSH + "/" + rsh,
		dataType: 'json',
		success: function(data){
			// console.log("@apiReloadwithMoveCode: rsh = "+rsh);
			// console.log("@apiReloadwithMoveCode: Data");
			// console.log(data);
			debug("jsonを取得しました");
			methods.constructBoardFrom(data);
			document.info.rsh.value = data.Rsh
			doMovePieceFromMoveCode(moveCode);
			IsBoardInit =true;
		}
	}).then(function(){ 
		refreshClickablePieceSetting();
	});

}

function apiInitBoard(callback){
	var methods = new apiMethods();
	moveAllPieceInDock();

	var url = API_RSH + "/"
	var movecCode = false;
	if(document.info.rsh.value){
		console.log("【最終手なし");
		url += document.info.rsh.value;
	} else if ( document.info.rshPrev.value && document.info.currentMove.value) {
				console.log("最終手あり");
		url += document.info.rshPrev.value;
		moveCode = document.info.currentMove.value
	}

	console.log("API = " + url);
	$.ajax({
		url: url,
		dataType: 'json',
		success: function(data){
			debug("jsonを取得しました");
			methods.constructBoardFrom(data);
			if (data.Info.LastMove){
				doMovePieceFromMoveCode(data.Info.LastMove);
			}
			document.info.rsh.value = data.Rsh
			IsBoardInit =true;
		}
	}).then(function(){ 
		callback("loaded");});
}

function apiGetRshCode(callback,currentRsh,Movecode){

	var fileurl;
	fileurl = '/api/board';
	if (currentRsh != "" && Movecode != "") {
		fileurl = fileurl + '/' + currentRsh + '/' + Movecode;
		console.log(fileurl);
	}	
	$.ajax({
		url: fileurl,
		dataType: 'json',
		success: function(data){
					debug("jsonを取得しました");
					document.info.rsh.value = data.Rsh;
					document.info.rshPrev.value = currentRsh;
					document.info.currentMove.value = Movecode;
					panelReloadTrigger();
		},
		error: function(){debug("jsonファイルの読み込みに失敗しました filename = ." + fileurl);}

	}).then(function(){ callback("loaded");});
}

var apiMethods = function(){}

apiMethods.prototype.constructBoardFrom = function(data){
		// 手番の取得
		isBlackTurn = data.Turn;
		// console.log("↓取得json");
		// console.log(data);

		// debug("現在の手番" + isBlackTurn);
		// data.boardから駒データ一覧を読み込み
		for(objName in data.Pieces)
		{
			// 駒データの取得
			var obj = data.Pieces[objName];
			var posID = obj["Pos"];
			var kindOfPiece = obj["Kop"];
			var isBlack = obj["Ply"];
			var isPromoted = obj["IsPrm"];

			// 持ち駒の場合の処理
			if (posID == 0 && isBlack) {	
				debug("持ち駒を配置します。")				
				posID = "bc";
			} else if (posID == 0 && !isBlack){
				debug("持ち駒を配置します。（後手）")
				posID = "wc";
			}
			 
			movePieceFromDock(posID,kindOfPiece,isBlack,isPromoted);
		}

		sortCapturedArea();
		debug("盤面読み込みが終了しました")
		IsBoardInit =true;
}

