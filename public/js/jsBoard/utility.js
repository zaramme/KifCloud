// 全般で使用するユーティリティクラス

IsDebugMode = true;


$(function(){

	debug("utility.jsを読み込みました");
});

function debug(message)
{
	if(IsDebugMode && $(".debugend").get(0)){
		$(".debugend").removeClass("debugend");
	}
		$("#debug").append("<div class=\"debugend\">" +message + "</div>");
		$("#debug").scrollTop($(".debugend").offset().top);
}

function selectAreaID(posID){
	return "#pos_" + posID;
}

function getPieceName(PieceObj){
	if(PieceObj.hasClass("OH"))
		return "OH";
	else if(PieceObj.hasClass("KIN"))
		return "KIN";
	else if(PieceObj.hasClass("GIN"))
		return "GIN";
	else if(PieceObj.hasClass("KEI"))
		return "KEI";
	else if(PieceObj.hasClass("KYO"))
		return "KYO";
	else if(PieceObj.hasClass("KAKU"))
		return "KAKU";
	else if(PieceObj.hasClass("HISHA"))
		return "HISHA";
	else if(PieceObj.hasClass("FU"))
		return "FU";
	else
		return false;
}

function getPieceCodeName(PieceObj){
	if(PieceObj.hasClass("OH"))
		return "OH";
	else if(PieceObj.hasClass("KIN"))
		return "KI";
	else if(PieceObj.hasClass("GIN"))
		return "GI";
	else if(PieceObj.hasClass("KEI"))
		return "KE";
	else if(PieceObj.hasClass("KYO"))
		return "KY";
	else if(PieceObj.hasClass("KAKU"))
		return "KA";
	else if(PieceObj.hasClass("HISHA"))
		return "HI";
	else if(PieceObj.hasClass("FU"))
		return "FU";
	else
		return false;
}


function getPieceObject(posID){
	return $(selectAreaID(posID)).children(".piece");
}

function getCapturedPieces(IsBlack){
	if(IsBlack == null)
		return $(".captured").children(".piece");
	else
		return $(IsBlack ? "#pos_bc" : "#pos_wc").children(".piece");
}
function getCapturedPiece(isBlack, kop) {
	return $(isBlack ? "#pos_bc" : "#pos_wc").children("."+kop);
}

function getAreaObject(posID){
	return $(selectAreaID(posID));
}

function isPieceBlack(pos){
	CurrentPiece = getPieceObject(pos);
	if(CurrentPiece.hasClass("black"))
	{
		return true;
	}
	else if(CurrentPiece.hasClass("white"))
	{
		return false;
	}

	return null;
}

function isCaptured(pos){
	return (pos=="bc" || pos == "wc");
}

function getPosFromPiece(PieceObj){
 	pieceAreaId = PieceObj.parent().attr("id");
 	posID = pieceAreaId.substring(4);
	return posID;
}

// 全ての駒の種類に対して実行
function eachKindOfPieceDo(isAssending, func){

	if(isAssending)
	{
		func("OH");
		func("HISHA");
		func("KAKU");
		func("KIN");
		func("GIN");
		func("KEI");
		func("KYO");
		func("FU");
		return;
	}
	else
	{
		func("FU");
		func("KYO");
		func("KEI");
		func("GIN");
		func("KIN");
		func("KAKU");
		func("HISHA");
		func("OH");
		return;		
	}
}