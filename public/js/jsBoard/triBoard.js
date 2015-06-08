//
$(function(){
debug("triBoard.jsを読み込みました");

});


function triBoard(){
	var init = {};
	for (var i = 11; i < 100; i++){
		init[i] = 0;
	}
	this.board = init;
}

triBoard.prototype.output = function(){
	debug("current triBoard is...");

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
triBoard.prototype.eachdo = function(func){
	for(var i = 11; i<100; i++)
	{
		func(i,this.board[i]);
	}
}

triBoard.prototype.getCurrentPieces = function(isWhichTurn){
	for(var i = 11; i<100; i++)
	{
		var CurrentArea = getAreaObject(i);
		var CurrentChild = CurrentArea.children('.piece');
		if(CurrentChild.length === 0)
		{
			this.board[i] = 0;
			continue;
		}
		if(CurrentChild.hasClass("black")){
			this.board[i] = isWhichTurn ? 1 : 2;
			continue;
		}
		else if(CurrentChild.hasClass("white")){
			this.board[i] = !isWhichTurn ? 1 : 2;
			continue;
		}
		debug("ERROR...getCurrentPiece");
	}
}
