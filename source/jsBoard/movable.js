// 駒の移動可能な座標を計算してビットボードを返すメソッド群

function computeMovable(pos,clickedPiece){
	var methods = new movableMethods();

	var pcClicked = new pieceConductor(clickedPiece);
	var isBlack = pcClicked.isBlack

	var movableBoard = new bitBoard();
	movableBoard.setPointer(pos);

	var triCurrentPieces = new triBoard(); // 自駒と敵駒の位置を取得
	triCurrentPieces.getCurrentPieces(isBlackTurn);

	if(isCaptured(pos))
	{
		movableBoard.allArea();
		CurrentBoard = new bitBoard();
		CurrentBoard.getCurrentPieces()
		movableBoard.minus(CurrentBoard); // 駒の無い場所を取得

		//debug("打ち駒の種類 =" + kindOfPiece);
		switch(pcClicked.kindOfPiece){
			case "FU":
				methods.computeFuDroppable(movableBoard,isBlack); break;
			case "KYO":
				methods.computeKyoDroppable(movableBoard,isBlack); break;
			case "KEI":
				methods.computeKeiDroppable(movableBoard,isBlack); break;
		}
	}
	else if(!pcClicked.isPromoted){
		switch(pcClicked.kindOfPiece){
			case "FU":
				methods.computeFuMovable(movableBoard,isBlack); break;
			case "OH":
				methods.computeOhMovable(movableBoard,isBlack); break;
			case "KIN":
				methods.computeKinMovable(movableBoard,isBlack); break;
			case "GIN":
				methods.computeGinMovable(movableBoard,isBlack); break;
			case "KEI":
				methods.computeKeiMovable(movableBoard,isBlack); break;
			case "KYO":
				methods.computeKyoMovable(movableBoard,isBlack); break;
			case "KAKU":
				methods.computeKakuMovable(movableBoard,isBlack); break;
			case "HISHA":
				methods.computeHishaMovable(movableBoard,isBlack); break;
			default:
				movableBoard.eachdo(function(pos,value){
				movableBoard.board[pos] = triCurrentPieces.board[pos] === 1 ? 0 : 1;
				});
				break;
		}
	}
	else{
		switch(pcClicked.kindOfPiece){
			case "FU":
				methods.computeKinMovable(movableBoard,isBlack); break;
			case "GIN":
				methods.computeKinMovable(movableBoard,isBlack); break;
			case "KEI":
				methods.computeKinMovable(movableBoard,isBlack); break;
			case "KYO":
				methods.computeKinMovable(movableBoard,isBlack); break;
			case "KAKU":
				methods.computeRyumaMovable(movableBoard,isBlack); break;
			case "HISHA":
				methods.computeRyuohMovable(movableBoard,isBlack); break;
			default:
				movableBoard.eachdo(function(pos,value){
				movableBoard.board[pos] = triCurrentPieces.board[pos] === 1 ? 0 : 1;
				});
				break;
		}

	}
	// 移動先ビットボードから自分の駒がいる座標を消去(駒の利き計算時はキャンセル)
	if(!isComputing)
	{
	movableBoard.eachdo(function(pos,value){
		if(triCurrentPieces.board[pos] === 1)
			movableBoard.board[pos] = 0;
	});
	}
	return movableBoard;
}

function computeIsOhte(){
	OhPiece = isBlackTurn? $(".OH.black") : $(".OH.white")
	OhPos = getPosFromPiece(OhPiece)

	var targetBoard = computeEnemyPower();
	return (targetBoard.board[OhPos] == 1);

}

// 敵駒の利きを計算する
function computeEnemyPower(){
	var targetBoard = new bitBoard();
	targetBoard.getEnemyPieces();

	isComputing = true; // 実行中フラグをたてる


	// 敵駒(targetBoard)の駒の利きを全て取得して、enemyPoweredAreaBoardに加算
	var enemyPoweredAreaBoard = new bitBoard();
	 targetBoard.eachdo(function(pos,value){
	 	if(value == 1){
	 		var CurrentBoard = new computeMovable(pos, getPieceObject(pos));
	 		enemyPoweredAreaBoard = enemyPoweredAreaBoard.marge(CurrentBoard);
	 	}
	 });

	isComputing = false; // 実行中フラグ終了

	return enemyPoweredAreaBoard;
}

function movableMethods(){}

movableMethods.prototype.computeOhMovable = function(targetBoard,isBlack){
	targetBoard.addArea(-1,1,isBlack);
	targetBoard.addArea(0,1,isBlack);
	targetBoard.addArea(1,1,isBlack);
	targetBoard.addArea(-1,0,isBlack);
	targetBoard.addArea(1,0,isBlack);
	targetBoard.addArea(-1,-1,isBlack);
	targetBoard.addArea(0,-1,isBlack);
	targetBoard.addArea(1,-1,isBlack);

	// 相手の駒の利きには動けない
	// この処理はループ時にキャンセルする
	if(isComputing)
		return;

	var enemyPowerBoard = new bitBoard();
	enemyPowerBoard = computeEnemyPower();
	targetBoard.minus(enemyPowerBoard);
}

movableMethods.prototype.computeKinMovable = function(targetBoard,isBlack){
	targetBoard.addArea(-1,1,isBlack);
	targetBoard.addArea(0,1,isBlack);
	targetBoard.addArea(1,1,isBlack);
	targetBoard.addArea(-1,0,isBlack);
	targetBoard.addArea(1,0,isBlack);
	targetBoard.addArea(0,-1,isBlack);
}

movableMethods.prototype.computeGinMovable = function(targetBoard,isBlack){
	targetBoard.addArea(-1,1,isBlack);
	targetBoard.addArea(0,1,isBlack);
	targetBoard.addArea(1,1,isBlack);
	targetBoard.addArea(-1,-1,isBlack);
	targetBoard.addArea(1,-1,isBlack);
}

movableMethods.prototype.computeKeiMovable = function(targetBoard,isBlack){
	targetBoard.addArea(-1,2,isBlack);
	targetBoard.addArea(1,2,isBlack);
}

movableMethods.prototype.computeKyoMovable = function(targetBoard,isBlack){
	targetBoard.addStraightArea(0,1,isBlack);
}
movableMethods.prototype.computeKakuMovable = function(targetBoard,isBlack){
	targetBoard.addStraightArea(1,1,isBlack);
	targetBoard.addStraightArea(-1,1,isBlack);
	targetBoard.addStraightArea(-1,-1,isBlack);
	targetBoard.addStraightArea(1,-1,isBlack);
}
movableMethods.prototype.computeHishaMovable = function(targetBoard,isBlack){
	targetBoard.addStraightArea(0,1,isBlack);
	targetBoard.addStraightArea(1,0,isBlack);
	targetBoard.addStraightArea(0,-1,isBlack);
	targetBoard.addStraightArea(-1,0,isBlack);
}
movableMethods.prototype.computeFuMovable = function(targetBoard,isBlack)
{
	targetBoard.addArea(0,1,isBlack);
}

movableMethods.prototype.computeRyumaMovable = function(targetBoard,isBlack){
	targetBoard.addStraightArea(1,1,isBlack);
	targetBoard.addStraightArea(-1,1,isBlack);
	targetBoard.addStraightArea(-1,-1,isBlack);
	targetBoard.addStraightArea(1,-1,isBlack);
	targetBoard.addArea(0,1,isBlack);
	targetBoard.addArea(-1,0,isBlack);
	targetBoard.addArea(1,0,isBlack);
	targetBoard.addArea(0,-1,isBlack);
}
movableMethods.prototype.computeRyuohMovable = function(targetBoard,isBlack){
	targetBoard.addStraightArea(0,1,isBlack);
	targetBoard.addStraightArea(1,0,isBlack);
	targetBoard.addStraightArea(0,-1,isBlack);
	targetBoard.addStraightArea(-1,0,isBlack);
	targetBoard.addArea(-1,1,isBlack);
	targetBoard.addArea(1,1,isBlack);
	targetBoard.addArea(-1,-1,isBlack);
	targetBoard.addArea(1,-1,isBlack);
}

movableMethods.prototype.computeFuDroppable = function(targetBoard,isBlack){

	var columnsBoard = new bitBoard();

	// 二歩の処理
	for(var i = 11; i < 100; i++)
	{
		var current = getPieceObject(i);
		if(current.length == 0)
			continue;
		var pcCurrent = new pieceConductor(current);

		// 自駒の歩を探索
		if(getPieceName(current) == "FU"
		   && isBlackTurn == pcCurrent.isBlack
		   && !pcCurrent.isPromoted)
		{
			// 自駒の歩のある列を追加
			columnsBoard.addColumnArea(Math.floor(i/10));
		}
	}

	// 先手の場合は一段目、後手の場合は九段目を追加
	var rowsBoard = new bitBoard();
	rowsBoard.addRowArea(isBlackTurn ? 1 : 9)

	//ビッドボードの差を取る
	targetBoard.minus(columnsBoard);
	targetBoard.minus(rowsBoard);
}

movableMethods.prototype.computeKeiDroppable = function(targetBoard,isBlack){
	rowsBoard = new bitBoard();
	rowsBoard.addRowArea(isBlackTurn ? 1 : 9);
	rowsBoard.addRowArea(isBlackTurn ? 2 : 8)
	targetBoard.minus(rowsBoard);
}

movableMethods.prototype.computeKyoDroppable = function(targetBoard,isBlack){
	rowsBoard = new bitBoard();
	rowsBoard.addRowArea(isBlackTurn ? 1 : 9);
	targetBoard.minus(rowsBoard);
}



