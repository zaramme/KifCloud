
// //////////////////////////////////////////////////////
// // publicメソッド(prefix:"move")

// // ゲーム上の「着手」として駒の移動処理を行う
function doMovePiece(fromPos,toPos,PieceToMove,isPromoted){
	var methods = new moveMethods();
	var kindToMove = getPieceCodeName(PieceToMove);
	var PieceToCapture = getPieceObject(toPos);

// 	// 駒を移動する
	movePiece(toPos, PieceToMove, isBlackTurn, isPromoted)

	if(PieceToCapture.length != 0) {
		// 駒を取れる場合の処理
		pcToCapture = new pieceConductor(PieceToCapture);
		CaptureTo = isBlackTurn? "bc":"wc";
		movePiece(CaptureTo,PieceToCapture, isBlackTurn, false);
	}

	// 着手後王手になっていないか(王手を外していないor敵ゴマの利きを通す)
	var isOhteNow = computeIsOhte();
	if(isOhteNow) {
		// 王手が継続している場合は着手を無効とする
		movePiece(fromPos,PieceToMove, isBlackTurn, isPromoted);// 移動前の座標に戻す
		if(PieceToCapture.length != 0)
			movePiece(pcToCapture.pos,PieceToCapture,!isBlackTurn,pcToCapture.isPromoted);
		return false; //着手失敗
	}

	methods.FinishMove(fromPos,toPos,kindToMove,isPromoted);		
	return true; // 着手完了
}


function doMovePieceFromMoveCode(moveCode){
	var args = moveCode.split(",");

	var PieceToMove;
	if (args[0] == "00") {
 	 PieceToMove = getCapturedPieceFirst(isBlackTurn,args[2])
	} else {
     PieceToMove = getPieceObject(args[0]);
 	}

 	var isPromoted = (args[3] == "true");
	doMovePiece(args[0],args[1],PieceToMove,isPromoted);
}

// プログラム上の処理として駒を移動させる
function movePiece(toPos,PieceToMove,isBlack,isPromoted){
	var methods = new moveMethods();

	// 必要なオブジェクトを取得
	var fromPos = getPosFromPiece(PieceToMove);
	var MoveToArea = getAreaObject(toPos);
	var CapturePiece = MoveToArea.children(".piece");

	//console.log("@movePiece isPoromoted = " + isPromoted);
	// 共通処理
	PieceToMove.prependTo(MoveToArea).css({top:'0',left:'0'});
	methods.appendPieceClasses(PieceToMove,isBlack, isPromoted);
}

// 駒台の複数枚数処理及び並び替え
function sortCapturedArea(pos){

	if(pos == null)
	{
		// 引数指定がない場合は先手、後手両方に処理
		sortCapturedArea("bc");
		sortCapturedArea("wc");
		return;
	}

	var methods = new moveMethods();
	var capturedArea = $("#pos_" + pos);

	// すべての属性を一旦削除
	capturedArea.children('.piece').removeClass('forefront');
	capturedArea.children('.piece').removeClass('omitted');
	capturedArea.children(".test").remove();

	// 駒台の駒を整理する
	eachKindOfPieceDo(pos=="bc", function(kindOfPiece){
		var pieces = capturedArea.children("."+kindOfPiece);
		var isForefront = true;
		pieces.each(function()
		{
			if(isForefront)
			{
				$(this).addClass('forefront');
				isForefront = false; // isForfrontは一枚のみ
				//debug("[駒台]______isforefrontを設定します @ " + $(this).attr("id"));
				return;
			}
			// 同じ種類の駒が２種類ある場合は、２枚目以降を表示しない（枚数で表示）
			$(this).addClass("omitted");
			//debug("[駒台]______omittedを設定します @ " + $(this).attr("id"));
		});
	});

	// 駒の並べ替え
	eachKindOfPieceDo(!(pos=="bc"), function(kindOfPiece){
		capturedArea.children("."+kindOfPiece+".forefront").prependTo(capturedArea);
	})

	// 駒数表示の追加
	eachKindOfPieceDo(true, function(kindOfPiece){
		var pieces = capturedArea.children("."+kindOfPiece);
		var forefront = capturedArea.children("."+kindOfPiece+".forefront");
		methods.addPieceCountText(forefront, pieces.length);
	})
}

// 移動後成れるかどうかの判定
function wheatherPromotable(fromPos, toPos, pieceToMove){
	toPosY = toPos % 10
	fromPosY = fromPos % 10;
	pcPiece = new pieceConductor(pieceToMove);

	// 成れる位置かどうか

	// 一段目、二段目の位置かどうか
	isEdgeArea = isBlackTurn? toPosY == 1 : toPosY == 9;
	isSemiEdgeArea = isBlackTurn? toPosY <= 2 : 8 <= toPosY;

	// 成りごまを動かす場合は必ず成り
	if(pcPiece.isPromoted)
		return true;

	// 持ち駒から着手した場合は必ず不成
	isFromCaptured = (fromPos == "bc" || fromPos == "wc")
	if(isFromCaptured)
		return false;

	// 成れる領域に駒を動かした場合
	isPromotableArea = isBlackTurn ? toPosY <= 3 : 7 <= toPosY;
	isFromPromotableArea = isBlackTurn ? fromPosY <= 3 : 7 <= fromPosY;
	if(isPromotableArea)
	{
		// 成れる駒かどうか
		switch(pcPiece.kindOfPiece)
		{
			// 王と金は成れない
			case "OH": return false; break;
			case "KIN": return false; break;
			// 歩、桂、香は場所によって成り確定
			case "KEI":
				return isSemiEdgeArea ? true : "select"; break;
			case "KYO":
				return isEdgeArea ? true : "select"; break;
			case "FU":
				return isEdgeArea ? true : "select"; break;
			default:
				return "select"; break;
		}
	}
	else if(isFromPromotableArea)
		switch(pcPiece.kindOfPiece)
		{
			// 王と金は成れない
			case "OH": return false; break;
			case "KIN": return false; break;
			default:
				return "select";
	}
	// 以上の条件に該当しない場合は全て不成
	return false;
}


// ドックから駒を配置する
function movePieceFromDock(posID, kindOfPiece, isBlack, isPromoted){
	var methods = new moveMethods();
	var targetArea = getAreaObject(posID);
	var nakedPiece = $("#pos_dock>.piece:first");
	nakedPiece.addClass(kindOfPiece);

	movePiece(posID, nakedPiece, isBlack, isPromoted);

}

// 全ての駒をドックに戻す
function moveAllPieceInDock(){
	methods = new moveMethods();

	var dock = getAreaObject("dock");

 	$(".lastmoved").removeClass("lastmoved");

	// 全ての駒の座標をビットボードで取得
	var currentPieces = new bitBoard();
	currentPieces.getCurrentPieces();

	currentPieces.eachdoSelected(function(pos,value){
		// 全ての駒をドックに格納
		var currentPiece = getPieceObject(pos);
		var target = getPieceObject(pos);
		movePiece("dock", target, false);
		methods.initPiece(target);
	})


 	var capturedPieces = getCapturedPieces();
 	if(capturedPieces.length != 0)
 	{
		capturedPieces.each(function(){
			movePiece("dock", $(this), false);
			methods.initPiece($(this));
		});
	}
}

//////////////////////////////////////////////////////
// privateメソッド(moveMethodsクラスのクラス内メソッドとして実装)

function moveMethods(){}

// 状態クラスをすべて消去する
moveMethods.prototype.clearPieceClasses = function(pieceObj){

	var funcRemove = function(strClass){
		if(pieceObj.hasClass(strClass))
			pieceObj.removeClass(strClass);
	}

	funcRemove("white");
	funcRemove("black");
	funcRemove("promoted");
	funcRemove("omitted");
	funcRemove("forefront");
}

// 駒の状態を初期化する
moveMethods.prototype.initPiece = function(pieceObj){
	this.clearPieceClasses(pieceObj);
	eachKindOfPieceDo(true, function(strClass){
		if(pieceObj.hasClass(strClass))
			pieceObj.removeClass(strClass);
	});
}

// 駒の状態を変化させる
moveMethods.prototype.appendPieceClasses
	 = function(pieceObj, isBlack, isPromoted){
	kindOfPiece = getPieceName(pieceObj);

	this.clearPieceClasses(pieceObj);
	if(isPromoted)
		pieceObj.addClass("promoted");
	if(isBlack)
		pieceObj.addClass("black");
	else
		pieceObj.addClass("white");
	this.appendImage(pieceObj, kindOfPiece, isBlack, isPromoted);
}

// 画像を変更する
moveMethods.prototype.appendImage = function(pieceObj, kindOfPiece, isBlack, isPromoted){

	imgID = this.createImageID(kindOfPiece,isBlack, isPromoted);
	pieceObj.children("img").attr("src",IMG_DIR+"/"+imgID+".png");
}

moveMethods.prototype.addPieceCountText = function(target,length){
	if(length > 1)
		target.after("<div class=\"test\"><div class=\"piece-count\">×" +length+ "</div></div>");
	else
		target.after("<div class=\"test\"></div>");
}

// 画像IDを生成する
moveMethods.prototype.createImageID = function (kindOfPiece,isReversed,isPromoted){
	var imgID = new String();
	switch(kindOfPiece){
		case PieceImageCode.OH:
			imgID += PieceImageCode.OH; break;
		case PieceImageCode.KIN:
			imgID += PieceImageCode.KIN; break;
		case PieceImageCode.GIN:
			imgID += PieceImageCode.GIN; break;
		case PieceImageCode.KEI:
			imgID += PieceImageCode.KEI; break;
		case PieceImageCode.KYO:
			imgID += PieceImageCode.KYO; break;
		case PieceImageCode.KAKU:
			imgID += PieceImageCode.KAKU; break;
		case PieceImageCode.HISHA:
			imgID += PieceImageCode.HISHA; break;
		case PieceImageCode.FU:
			imgID += PieceImageCode.FU; break;
		}
	if(!isReversed){
		imgID += PieceImageCode.reverse;
	}
	if(isPromoted){
		imgID += PieceImageCode.promoted;
	}
	return imgID;
}

// 着手完了手続き
moveMethods.prototype.FinishMove = function(fromPos,toPos,kindOfPiece,isPromoted)
{
	moveCode = this.getMovecode(fromPos,toPos,kindOfPiece,isPromoted);

	isBlackTurn = !isBlackTurn;
	isOhte = computeIsOhte();

	$(".lastmoved").removeClass("lastmoved");
	var target = getAreaObject(toPos)
	target.addClass("lastmoved");

	$("#selectbox").css("visibility", "hidden");

	sortCapturedArea();

}

moveMethods.prototype.getMovecode = function(fromPos,toPos,kindOfPiece,isPromoted)
{
	var movecode;
	if(isBlackTurn)
		movecode = "b"
	else 
		movecode = "w"
	movecode = movecode +toPos;
	movecode = movecode + kindOfPiece;
	if(fromPos=="bc" || fromPos == "wc")
		fromPos = "00";
	movecode = movecode + "_"+fromPos+"";
	if(isPromoted)
		movecode = movecode + "!";
	return movecode;
}
