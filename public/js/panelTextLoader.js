$(function(){

	mainPanelTextLoader();

	var form = $("#panelTextLoader").find("form");
	var kifInput = form.children("div").children("#kifTextInput");
	kifInput.children('#ptl-sampleKifu').click(function(e){
		e.preventDefault();
		setSampleKif();	
	})

});

function mainPanelTextLoader(){
	var form = $("#panelTextLoader").find("form");
	var kifInput = form.children("div").children("#kifTextInput");

	kifInput.children('label').hide();

	form.submit(function(event) {

		// 通常のフォーム送信をブロック
		event.preventDefault();

		apiDirectLoadText(form,null);
	});

	var footer = form.children(".box-footer");

		
	footer.children("input[type=reset]").click(function(){
		kifInput.removeClass('has-error');		
		kifInput.removeClass('has-success');
		kifInput.children('textarea').removeAttr('disabled');
		kifInput.children('label').hide();
	});

}


function SetValidator(isValid, message){
	var form = $("#panelTextLoader").find("form");
	var kifInput = form.children("div").children("#kifTextInput");

	if (isValid) {
		kifInput.removeClass('has-error');		
		kifInput.addClass('has-success');
		kifInput.children('label').html('<i class="fa fa-check"></i>棋譜の読み込みに成功しました' ); 
		kifInput.children("textarea").attr('disabled','');
		kifInput.children('label').show();
	} else {
		kifInput.addClass('has-error');
		kifInput.removeClass('has-success');
		kifInput.children('label').html('<i class="fa fa-times-circle-o"></i>' + message); 
		kifInput.children('label').show();
	}
}

function LoadDirectTextTrigger(data){
	$("#PanelMoveList").trigger('loadKifuWithJson',{"json":data});
}

function apiDirectLoadText(form,callback){

	var button = form.find("input")
	var kifInput = form.children("div").children("#kifTextInput");
		kifInput.children('textarea').removeAttr('disabled');

	$.ajax({
		url: '/api/kifu/directTextLoader',
		type: 'POST',
		data: form.serialize(),
        beforeSend: function(xhr, settings) {
            // ボタンを無効化し、二重送信を防止
            button.attr('disabled', true);
        },
		success:function(json) {
			switch(json.StatusCode){
				case 0:
				LoadDirectTextTrigger(json.Data);
				SetValidator(true, null);
				break
				default:
				SetValidator(false, json.Message);
				break
			}
		},
		error:function(json){
				SetValidator(false, "システムエラー：管理者にご報告ください");
		},
        // 応答後
        complete: function(xhr, textStatus) {
            // ボタンを有効化し、再送信を許可
            button.attr('disabled', false);
        }
	});
}

function setSampleKif(){
	var form = $("#panelTextLoader").find("form");
	var kifInput = form.children("div").children("#kifTextInput");
	kifInput.children('textarea').val(sampleKif);
	kifInput.children('textarea').removeAttr('disabled');
}

const sampleKif = '開始日時：1959/05/12\n'
+ '終了日時：1959/05/13\n'
+ '棋戦：第18期名人戦第３局\n'
+ '先手：大山康晴九段・王将\n'
+ '後手：升田幸三名人\n'
+ '手数----指手---------消費時間--\n'
+ '1 ７六歩(77)\n'
+ '2 ８四歩(83)\n'
+ '3 ６八銀(79)\n'
+ '4 ３四歩(33)\n'
+ '5 ７七銀(68)\n'
+ '6 ４二銀(31)\n'
+ '7 ２六歩(27)\n'
+ '8 ６二銀(71)\n'
+ '9 ４八銀(39)\n'
+ '10 ５四歩(53)\n'
+ '11 ５六歩(57)\n'
+ '12 ３二金(41)\n'
+ '13 ７八金(69)\n'
+ '14 ４一玉(51)\n'
+ '15 ６九玉(59)\n'
+ '16 ７四歩(73)\n'
+ '17 ３六歩(37)\n'
+ '18 ５三銀(62)\n'
+ '19 ２五歩(26)\n'
+ '20 ３三銀(42)\n'
+ '21 ５七銀(48)\n'
+ '22 ５二金(61)\n'
+ '23 ５八金(49)\n'
+ '24 ３一角(22)\n'
+ '25 ７九角(88)\n'
+ '26 ４二角(31)\n'
+ '27 ４六銀(57)\n'
+ '28 ５一角(42)\n'
+ '29 ３五歩(36)\n'
+ '30 ４四歩(43)\n'
+ '31 ３四歩(35)\n'
+ '32 ３四銀(33)\n'
+ '33 ３七銀(46)\n'
+ '34 ３一玉(41)\n'
+ '35 ２四歩(25)\n'
+ '36 ２四歩(23)\n'
+ '37 ２四角(79)\n'
+ '38 ７三角(51)\n'
+ '39 ４六角(24)\n'
+ '40 ６四歩(63)\n'
+ '41 ３六歩打\n'
+ '42 ２三歩打\n'
+ '43 ５七角(46)\n'
+ '44 ５五歩(54)\n'
+ '45 ５五歩(56)\n'
+ '46 ６五歩(64)\n'
+ '47 ７五歩(76)\n'
+ '48 ５六歩打\n'
+ '49 ４八角(57)\n'
+ '50 ７五歩(74)\n'
+ '51 ５四歩(55)\n'
+ '52 ５四銀(53)\n'
+ '53 ７五角(48)\n'
+ '54 ２二玉(31)\n'
+ '55 ７四歩打\n'
+ '56 ５一角(73)\n'
+ '57 ３五歩(36)\n'
+ '58 ４三銀(34)\n'
+ '59 ２六飛(28)\n'
+ '60 ６三金(52)\n'
+ '61 ５六飛(26)\n'
+ '62 ５五歩打\n'
+ '63 ２六飛(56)\n'
+ '64 ７二飛(82)\n'
+ '65 １六歩(17)\n'
+ '66 ７四飛(72)\n'
+ '67 ４八角(75)\n'
+ '68 ７二飛(74)\n'
+ '69 １五歩(16)\n'
+ '70 ９四歩(93)\n'
+ '71 ９六歩(97)\n'
+ '72 ７五歩打\n'
+ '73 １八香(19)\n'
+ '74 ４二角(51)\n'
+ '75 ３六銀(37)\n'
+ '76 ７六歩(75)\n'
+ '77 ６八銀(77)\n'
+ '78 ７三桂(81)\n'
+ '79 １四歩(15)\n'
+ '80 １四歩(13)\n'
+ '81 １三歩打\n'
+ '82 ８五桂(73)\n'
+ '83 １四香(18)\n'
+ '84 １三香(11)\n'
+ '85 １三香成(14)\n'
+ '86 １三玉(22)\n'
+ '87 ３四歩(35)\n'
+ '88 ２二玉(13)\n'
+ '89 ３五銀(36)\n'
+ '90 ７三香打\n'
+ '91 ７五歩打\n'
+ '92 １五角(42)\n'
+ '93 １六飛(26)\n'
+ '94 ４八角成(15)\n'
+ '95 ４八金(58)\n'
+ '96 １五歩打\n'
+ '97 ２六飛(16)\n'
+ '98 ７五香(73)\n'
+ '99 ７三歩打\n'
+ '100 ７三飛(72)\n'
+ '101 ２四歩打\n'
+ '102 ７七歩成(76)\n'
+ '103 ２三歩成(24)\n'
+ '104 ２三金(32)\n'
+ '105 ２三飛成(26)\n'
+ '106 ２三玉(22)\n'
+ '107 １四角打\n'
+ '108 まで先手の勝ち';



