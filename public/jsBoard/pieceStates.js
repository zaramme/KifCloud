// 駒の状態を一斉取得するクラス
$(function(){

debug("pieceStates.jsを読み込みました");

});


function pieceConductor(posIdOrPieceObject){
	// 駒の座標
	if(isNaN(posIdOrPieceObject))
	{
		this.piece = posIdOrPieceObject;
		this.pos = getPosFromPiece(posIdOrPieceObject);
	}
	else
	{
		this.piece = getPieceObject(posIdOrPieceObject);
		this.pos = posIdOrPieceObject;
	}
	// 駒の種類
	this.kindOfPiece = this.getPieceName(this.piece);

	// 先手の駒かどうか
	this.isBlack = this.piece.hasClass("black");
	// 成り駒かどうか
	this.isPromoted = this.piece.hasClass("promoted");
}

pieceConductor.prototype.setPieceBlackWhite = function(IsBlack){

}

pieceConductor.prototype.appendPieceClasses = function(isBlack, isPromoted){

	this.isBlack = isBlack;
	this.isPromoted = isPromoted;
	this.clearPieceClasses();
	if(isPromoted)
		this.piece.addClass("promoted");

	if(isBlack)
		this.piece.addClass("black");
	else
		this.piece.addClass("white");

	this.appendImage();
}

pieceConductor.prototype.clearPieceClasses = function(){
	if(this.piece.hasClass("promoted"))
		this.piece.removeClass("promoted");
	if(this.piece.hasClass("white"))
		this.piece.removeClass("white");
	if(this.piece.hasClass("black"))
		this.piece.removeClass("black");
}

pieceConductor.prototype.appendImage = function(){
	imgID = this.createImageID();
	this.piece.children("img").attr("src",IMG_DIR+imgID+".png");
}

pieceConductor.prototype.createImageID = function (){
	var imgID = new String();
	switch(this.kindOfPiece){
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
	if(!this.isBlack){
		imgID += PieceImageCode.reverse;
	}
	if(isPromoted){
		imgID += PieceImageCode.promoted;
	}
	return imgID;
}


pieceConductor.prototype.output = function(){
	debug("駒の種類…" + this.kindOfPiece);
	debug("駒の所有…" + this.isBlack);
	debug("駒の成り…" + this.isPromoted);
}

pieceConductor.prototype.selectAreaID = function(posID){
	return "#pos_" + posID;
}


pieceConductor.prototype.getPieceObject = function(pos){
	target = $(this.selectAreaID(pos)).children("piece");
	debug( target.length );
	return $(this.selectAreaID(pos)).children("piece");
}

pieceConductor.prototype.getAreaObject = function(pos){
	return $(this.selectAreaID(pos));
}
pieceConductor.prototype.getPieceName = function(pieceObj){
	if(pieceObj.hasClass("OH"))
		return "OH";
	else if(pieceObj.hasClass("KIN"))
		return "KIN";
	else if(pieceObj.hasClass("GIN"))
		return "GIN";
	else if(pieceObj.hasClass("KEI"))
		return "KEI";
	else if(pieceObj.hasClass("KYO"))
		return "KYO";
	else if(pieceObj.hasClass("KAKU"))
		return "KAKU";
	else if(pieceObj.hasClass("HISHA"))
		return "HISHA";
	else if(pieceObj.hasClass("FU"))
		return "FU";
	else
		return false;

}