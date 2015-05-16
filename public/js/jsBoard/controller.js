// メインスクリプト /////////////////////////////////////////////

$(function(){

$(".board").css('background','url(\''+IMG_DIR+'/japanese-chess-b02.png\')')
$("#bgboard").attr("src",IMG_DIR+"/japanese-chess-b02.png");

apiInitBoard(refreshClickablePieceSetting);

});

// パネル更新イベントの発生
function panelReloadTrigger(){
	debug("パネル更新トリガーが呼び出されました");
	var reloadPanel = new $.Event("reloadPanel")
	$(".panel").trigger("reloadPanel");
}

// 選択可能な駒のセット
function refreshClickablePieceSetting(){
	// 既存のドラッグ可能処理をすべて消去
	$(".draggable").draggable('destroy');
	$(".draggable").removeClass("draggable");

	if(isReserving)
		return;

	// 盤上の手番の駒すべてにDraggableを適用
	var all = new bitBoard();
	all.eachdo(function(pos,value)
		{
			var CurrentPiece = getPieceObject(pos);
			if(CurrentPiece.length != 0 && CurrentPiece.hasClass(isBlackTurn?"black":"white")){
				addDraggable(CurrentPiece,pos);
			}
		}
	);
	// 駒台の手番の駒すべてにDraggableを適用
	CapturedPieces = getCapturedPieces(isBlackTurn);
	CapturedPieces.each(function(){
		var capturedPos = getPosFromPiece($(this));
		addDraggable($(this), capturedPos);
	});
}

// ドラッグ可能処理の追加
function addDraggable(obj, pos){
	obj.addClass("draggable");
	obj.draggable({
				stack:".piece",
				revert: true,
				containment: "document",
				distance : 0,
				cursorAt : {top: 35, left:30},
				start: function(){clickPiece(pos,obj);},
				stop: function(){endClickPiece(pos);}
				});
}

// 駒をクリックしたときの処理
function clickPiece(pos, obj) {
	if(isReserving)
		return;

	var Methods = new moveMethods();
	var clickedArea = getAreaObject(pos);
	var pcClicked = new pieceConductor(obj)

	// 駒の移動可能位置を取得
	var target = new bitBoard();
	target = computeMovable(pos,obj);

	// 移動可能位置に対してMovableを適用
	target.eachdoSelected(function(pos,value){
		addMovable(pos);
	});

	if(pos=="bc" || pos =="wc")
	{
		//debug("駒台の駒をクリックしました = "+ pcClicked.kindOfPiece + ", " +pcClicked.isBlack + ", " + pcClicked.isPromoted);
		CapturedPieces = clickedArea.children("."+pcClicked.kindOfPiece);

		if(CapturedPieces.length > 1)
		{
			//debug("ゴーストを表示します");
			ghost = $("#ghost");
			ghost.removeClass('hidden');
			var ghostPos = obj.offset();
			ghost.offset({top: ghostPos.top, left: ghostPos.left});
			Methods.appendImage(ghost,pcClicked.kindOfPiece, pcClicked.isBlack, pcClicked.isPromoted);
		}
	}
}

function addMovable(toPos) {
	var CurrentArea = getAreaObject(toPos);
	CurrentArea.addClass("movable");

	// droppableを適用
	CurrentArea.droppable({
		accept: ".piece",
		over: function(){ CurrentArea.addClass("dropin");},
		out:  function(){ CurrentArea.removeClass("dropin");},
		drop: function(e,ui){
			// ドロップ時の処理
			pieceToMove = ui.draggable;
			fromPos = getPosFromPiece(pieceToMove);

			// 成り駒処理を判定(false=常に成らない、select=選択可能、ture=常に成る)
			res = wheatherPromotable(fromPos,toPos,pieceToMove);
			switch(res)
			{
				case true:
					if(doMovePiece(fromPos,toPos, pieceToMove, true))
						refreshClickablePieceSetting();
					break;
				case "select":
					ShowReservedView(fromPos, toPos, pieceToMove);
					break;
				case false:
					if(doMovePiece(fromPos,toPos, pieceToMove, false))
						refreshClickablePieceSetting();
					break;
				case "error":
					debug("エラーが発生しました");
					break;
			}
		}
	});
}

// 駒成り選択画面の表示
// この画面が表示されている場合は処理をストップする
function ShowReservedView(fromPos, toPos, pieceToMove) {
	debug("成りセレクトを表示しています");
	Methods = new moveMethods();
	pcPiectToMove = new pieceConductor(pieceToMove);
	targetPos = getAreaObject(toPos);
	targetPiece = getPieceObject(toPos);

	// 成りセレクトボックスの表示位置を設定
	selectboxPositionTop = parseInt(targetPos.css("top")) -20;
	selectboxPositionLeft = parseInt(targetPos.css("left")) -10;
	$("#selectbox").css("top", selectboxPositionTop);
	$("#selectbox").css("left", selectboxPositionLeft);

	// 他のクリック操作を一時的にストップ
	isReserving = true;
	refreshClickablePieceSetting();

	pieceToMove.addClass("hidden");
	targetPiece.addClass("hidden");

	debug("ゴーストを表示します");
	ghost = $("#ghost");
	ghost.addClass('virtual');
	ghost.removeClass('hidden');
	var ghostPos = targetPos.offset();
	ghost.offset({top: ghostPos.top, left: ghostPos.left});
	Methods.appendImage(ghost,pcPiectToMove.kindOfPiece, pcPiectToMove.isBlack, pcPiectToMove.isPromoted);

	// セレクトボックスの可視化とクリック属性の指定
	$("#selectbox").css("visibility", "visible");

	// $(".board").bind('click',function(){ 盤上をクリックでキャンセル

	// 成り判定
	$("#selectbox").children(".button").bind('click',function(){
		var isPromotion = $(this).attr("id") == "promotion";
		isReserving = false;
		pieceToMove.removeClass("hidden");
		targetPiece.removeClass("hidden");
		ghost.addClass('hidden');
		if(doMovePiece(fromPos,toPos, pieceToMove, isPromotion)) //着手する
		{
			debug("着手成功");
			// 着手が成功した場合の処理
			$("#selectbox").children(".button").unbind('click'); //Clickイベントを削除
			refreshClickablePieceSetting();
		}
		else
		{
			movePiece(fromPos,pieceToMove, isBlackTurn, false);
			$("#selectbox").children(".button").unbind('click'); //Clickイベントを削除
			$("#selectbox").css("visibility", "hidden");
			refreshClickablePieceSetting();
		}
	});
}

// 駒のドラッグの終了処理
function endClickPiece(pos){
	clickedArea = getAreaObject(pos);
	clickedArea.removeClass("selected");
	$(".dropin").removeClass("dropin");
	$(".movable").droppable("destroy");
	$(".movable").removeClass("movable");

	// ゴーストをクリア
	if(!isReserving)
	{
		$("#ghost").addClass('hidden');
		$(".virtual").removeClass('virtual');
	}
}

