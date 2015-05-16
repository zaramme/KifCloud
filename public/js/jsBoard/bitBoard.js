// ビットボード…盤上の座標の組み合わせを表現するクラス
$(function(){
debug("bitBoard.jsを読み込みました");

});

function bitBoard(){
	var init = {};
	for (var i = 11; i < 100; i++){
		init[i] = 0;
	}
	this.board = init;
	this.pointerX = 1;
	this.pointerY = 1;
}

bitBoard.prototype.output = function(){
	debug("current bitBoard is...");

	debug(this.board[91] + ", "  + this.board[81] + ", "  + this.board[71] + ", "  + this.board[61] + ", "  + this.board[51] + ", "  + this.board[41] + ", "  + this.board[31] + ", "  + this.board[21] + ", "  + this.board[11])
	debug(this.board[92] + ", "  + this.board[82] + ", "  + this.board[72] + ", "  + this.board[62] + ", "  + this.board[52] + ", "  + this.board[42] + ", "  + this.board[32] + ", "  + this.board[22] + ", "  + this.board[12])
	debug(this.board[93] + ", "  + this.board[83] + ", "  + this.board[73] + ", "  + this.board[63] + ", "  + this.board[53] + ", "  + this.board[43] + ", "  + this.board[33] + ", "  + this.board[23] + ", "  + this.board[13])
	debug(this.board[94] + ", "  + this.board[84] + ", "  + this.board[74] + ", "  + this.board[64] + ", "  + this.board[54] + ", "  + this.board[44] + ", "  + this.board[34] + ", "  + this.board[24] + ", "  + this.board[14])
	debug(this.board[95] + ", "  + this.board[85] + ", "  + this.board[75] + ", "  + this.board[65] + ", "  + this.board[55] + ", "  + this.board[45] + ", "  + this.board[35] + ", "  + this.board[25] + ", "  + this.board[15])
	debug(this.board[96] + ", "  + this.board[86] + ", "  + this.board[76] + ", "  + this.board[66] + ", "  + this.board[56] + ", "  + this.board[46] + ", "  + this.board[36] + ", "  + this.board[26] + ", "  + this.board[16])
	debug(this.board[97] + ", "  + this.board[87] + ", "  + this.board[77] + ", "  + this.board[67] + ", "  + this.board[57] + ", "  + this.board[47] + ", "  + this.board[37] + ", "  + this.board[27] + ", "  + this.board[17])
debug(this.board[98] + ", "  + this.board[88] + ", "  + this.board[78] + ", "  + this.board[68] + ", "  + this.board[58] + ", "  + this.board[48] + ", "  + this.board[38] + ", "  + this.board[28] + ", "  + this.board[18])
	debug(this.board[99] + ", "  + this.board[89] + ", "  + this.board[79] + ", "  + this.board[69] + ", "  + this.board[59] + ", "  + this.board[49] + ", "  + this.board[39] + ", "  + this.board[29] + ", "  + this.board[19])

	debug("");
}

// 関数を現在のboard全てに実行
bitBoard.prototype.eachdo = function(func){
	for(var i = 11; i<100; i++)
	{
		func(i,this.board[i]);
	}
}

bitBoard.prototype.eachdoSelected = function(func){
	for(var i = 11; i<100; i++)
	{
		if(this.board[i] == 1)
			func(i,this.board[i]);
	}
}

bitBoard.prototype.allArea = function(){
	for(var i = 11; i<100; i++)
	{
		this.board[i] = 1;
	}
}

bitBoard.prototype.getCurrentPieces = function(){
	for(var i = 11; i<100; i++)
	{
		var CurrentArea = getAreaObject(i);
		var CurrentChild = CurrentArea.children('.piece');
		if(CurrentChild.length != 0)
		{
			this.board[i] = 1;
		}
	}
}

bitBoard.prototype.getAllMovable = function(IsWhichTurn){
	for(var i = 11; i<100; i++){
		var CurrentArea = getAreaObject(i);
		var CurrentChild = CurrentArea.children('.piece');
		if(CurrentChild.length == 0 || CurrentChild.hasClass(IsWhichTurn ? "white":"black"))
		{
			this.board[i] = 1;
		}
	}
}

bitBoard.prototype.getEnemyPieces = function(){
	for(var i = 11; i<100; i++){
		var CurrentPiece = getPieceObject(i);
		if(CurrentPiece.length == 0)
			continue;
		if(CurrentPiece.hasClass(isBlackTurn ? "white" : "black"))
			this.board[i] = 1;
	}
}

bitBoard.prototype.setPointer = function(pos){
	this.pointerX = Math.floor(pos /10);
	this.pointerY = pos % 10;
	//debug("ポインタがセットされました…X="+ this.pointerX + ", Y=" + this.pointerY);
}

// ポインタを基準にエリアを追加する
bitBoard.prototype.addArea = function(vectorX, vectorY, isBlack){
	var targetPosX = this.pointerX;
	var targetPosY = this.pointerY;
	// ベクターを座標の方向に反転する
	if(isBlack){
		vectorY = vectorY * -1;
	}
	else{
		vectorX = vectorX * -1;
	}

	targetPosX = this.pointerX + vectorX;
	targetPosY = this.pointerY + vectorY;

	// ベクター演算結果が盤外になる場合は処理を行わない
	if(!this.isPositionInBoard(targetPosX,targetPosY)){
		return;
	}

	//debug("対象先が盤の内側です。")
	this.board[this.getPosXY(targetPosX,targetPosY)] = 1;
}

bitBoard.prototype.addStraightArea = function(vectorX, vectorY, isBlack){
	var currentBoard = new bitBoard();
	currentBoard.getCurrentPieces();
	//debug("一方方向の連続エリアを追加しています...");
	// ベクターを先後に応じた方向に反転する
	if(isBlack){
		vectorY = vectorY * -1;
	}
	else{
		vectorX = vectorX * -1;
	}

	var targetPosX = this.pointerX + vectorX;
	var targetPosY = this.pointerY + vectorY;

	//currentBoard.output();

	while(this.isPositionInBoard(targetPosX,targetPosY)){
		var targetPosXY = this.getPosXY(targetPosX,targetPosY);

		this.board[targetPosXY] = 1;

		if(currentBoard.board[targetPosXY] === 1)
		{
			//debug("駒にぶつかりました");
			break;
		}
		targetPosX = targetPosX + vectorX;
		targetPosY = targetPosY + vectorY;
	}
}

bitBoard.prototype.addColumnArea = function(column){
	for(var i = 11; i<100; i++)
	{
		if( Math.floor(i / 10) == column)
			this.board[i] = 1;
	}
}

bitBoard.prototype.addRowArea = function(row){
	for(var i = 11; i<100; i++)
	{
		if( (i % 10) == row)
			this.board[i] = 1;
	}
}


bitBoard.prototype.isPositionInBoard = function(posX,posY){
	if(posX < 1 || 9 < posX ){
		return false;
	}
	if(posY < 1 || 9 < posY ){
		return false;
	}
	return true;
}

bitBoard.prototype.getPosXY = function(posX,posY){
	return posX * 10 + posY;
}


// 引数に取ったボードとの和を取り、その結果を返す(immutable)
bitBoard.prototype.marge = function(otherBoard)
{
	var resultBoard = this;

	this.eachdo(function(pos,value){
		if(otherBoard.board[pos]==1){
			resultBoard.board[pos] = 1;
		}
	});

	return resultBoard;
}

// 引数に取ったボードとの差を取り、その結果を返す
bitBoard.prototype.minus = function(otherBoard)
{
	var resultBoard = this;

	this.eachdo(function(pos,value){
		if(otherBoard.board[pos] == 1){
			resultBoard.board[pos] = 0;
		}
	});

	return resultBoard;
}
