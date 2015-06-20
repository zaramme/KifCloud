// グローバル変数・定数を定義するクラス
$(function(){

debug("define.jsを読み込みました");

});

var isBlackTurn = true;
var isComputing = false;
var isReserving = false;
var ReservingCount;
var isOhte = false;
var reservedPos = 0;
PieceImageCode = new Object();
PieceImageCode.black = 'black/';
PieceImageCode.white = 'white/';
PieceImageCode.OH = "OH";
PieceImageCode.KIN = "KIN";
PieceImageCode.GIN = "GIN";
PieceImageCode.KEI = "KEI";
PieceImageCode.KYO = "KYO";
PieceImageCode.KAKU = "KAKU";
PieceImageCode.HISHA = "HISHA";
PieceImageCode.FU = "FU";
PieceImageCode.separator = "_";
PieceImageCode.reverse = "r";
PieceImageCode.promoted = "promoted/";
PieceImageCode.upsideDown = "upside_down/";

// 駒の種類
const OH = 0;
const KIN = 1;
const GIN = 2;
const KEI = 3;
const KYO = 4;
const KAKU = 5;
const HISHA = 6;
const FU = 7;

// 先手後手
const BLACK = false;
const WHITE = false;

// 盤面の状態
const hasBlackPiece = 0;
const hasWhitePiece = 1;
const none = null;

