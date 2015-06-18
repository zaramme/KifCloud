$(function(){
	debug("jsKifu/controller.jsを読み込みました");

	$("#PanelMoveList").ready(function(){
		// debug("panelmovelist読み込みを実行します");
//		 apiLoadKifu();
	});

	$("#PanelMoveList").children("select").change(function(){
		loadSelectedBoard();
	});

	// イベントリスナー
	$("#PanelMoveList").on("loadKifuWithJson", function(ev,data){
		setKifuWithJson(data);
	});

	$("#PanelMoveList").on("pushKifuNode", function(ev,data){
		pushKifuNode(data)
	});

	$("#PanelMoveList").on("jkfScrollNext", function(ev,callback){
		selectNext(callback);
	});

	$("#PanelMoveList").on("jkfScrollPrev", function(ev,callback){
		selectPrev(callback);
	});

	// キーボードによる棋譜操作
	$('html').keyup(function(event) {
		switch(event.which)	{
			case 39: // Key[→]
				selectNext();
            break;
 
            case 37: // Key[←]
            	selectPrev();
            break;
 		}
	});
});

function loadSelectedBoard(){
	var selected = $("#PanelMoveList").children("select").children(":selected");
	var lastJsCode = selected.attr('data-LastJsCode')
	//console.log('lastJsCode = ' + lastJsCode)
	if (!selected.attr('data-LastJsCode')|| !selected.attr('data-LastMoveCode')
		|| selected.attr('data-LastJsCode') == undefined || selected.attr('data-LastMoveCode') == undefined){
		//console.log("局面ノードが選択されました(最終手なし)");
		var rsh = selected.attr('data-RshCurrent');
		var moveCode = null;
	} else if (lastJsCode == 'END_OF_GAME')
	{
		//console.log("局面ノードが選択されました(終了)");			
		var selectedPrev = selected.prev()
		var rsh = selectedPrev.attr('data-RshPrev');
		var LastJsCode = selectedPrev.attr('data-LastJsCode');
		var LastMoveCode = selectedPrev.attr('data-LastMoveCode');

	} else {
		var rsh = selected.attr('data-RshPrev');
		//console.log("局面ノードが選択されました(最終手あり)");
		var LastJsCode = selected.attr('data-LastJsCode');
		var LastMoveCode = selected.attr('data-LastMoveCode');
	}

	obj = {rsh:rsh,"LastJsCode":LastJsCode,"LastMoveCode":LastMoveCode};

	//console.log(obj);


	$('.board').trigger('jbdSetTriangleExist', hasNextorPrev(selected));

	SetBoardTrigger(obj);	
}

function hasNextorPrev(selected){
	var data = {"prev":true, "next":true};

	var prev = selected.prev('option');
	if (prev.length == 0) {
		data["prev"] = false;
	}
	var next = selected.next('option');
	if (next.length == 0) {
		data["next"] = false;
	}
	return data
}

function clearKifu(){
	var listBox = $("#PanelMoveList").children("select");
	var nodes = listBox.children();
	nodes.remove();
}

function setKifuWithJson(data){
	clearKifu();
	//console.log("--棋譜をセットしています");
	//console.log(data);
	data = data.json;

	apiGetKifuInit(function(boardState){
		pushKifuNode({
						"RshCurrent":boardState.Info.RshCurrent,
						"MoveText":"(開始局面)"
					});

		for (var i = 0, len = data.length; i < len; i++){
				$("#PanelMoveList").children("select")
				.append(
					$('<option>')
						.html(data[i].MoveText)
						.attr({
							"data-RshCurrent": data[i].RshCurrent,
							"data-RshPrev": data[i].RshPrev,
							"data-LastMoveCode": data[i].LastMoveCode,
							"data-LastJsCode": data[i].LastJsCode,
						})
					);
		}	
		selectFirst();

	});
}

function pushKifuNode(data){
	var appendOption = 	$('<option>')
							.html(data.MoveText)
							.attr({
								"data-RshCurrent": data.RshCurrent,
								"data-RshPrev": data.RshPrev,
								"data-LastJsCode": data.LastJsCode,
								"data-LastMoveCode": data.LastMoveCode,
							});

	var listBox = $("#PanelMoveList").children("select")
	var selected = listBox.children(":selected");
	if (selected.length == 0) {
		$("#PanelMoveList").children("select").append(appendOption)
		$("#PanelMoveList").children("select").children().prop('selected', true);		

	} else {
		var nexts = listBox.children(":selected").nextAll();
		nexts.remove();
		//console.log("寄付ノードを追加します");		
		selected.after(appendOption)
		selected.prop('selected',false);
		selected.next().prop('selected', true);
	}

	selected = listBox.children(":selected");
	$('.board').trigger('jbdSetTriangleExist', hasNextorPrev(selected));
}

function selectPrev(){
	var listBox = $("#PanelMoveList").children("select");
	var previous = listBox.children(':selected').prev("option");
	if ( previous.length == 0 ) {
		return;
	}
	var current = listBox.children(':selected')

	current.prop('selected', false);
	previous.prop('selected', true);

	loadSelectedBoard();
}

function selectNext(){
	var listBox = $("#PanelMoveList").children("select");
	var next = listBox.children(":selected").next("option");
	if (next.length == 0) {
		return;
	}
	var current = listBox.children(':selected')

	current.prop('selected', false);
	next.prop('selected', true);

	loadSelectedBoard();
}

function selectFirst(){
	var listBox = $("#PanelMoveList").children("select").children("input");
	var first = listBox.first();
	var current = listBox.children(':selected');

	current.prop('selected', false);
	first.prop('selected', true);

	loadSelectedBoard();
}


function setMoveList(data){
		//debug("--棋譜をセットしています");
	for (var i = 0, len = data.length; i < len; i++){
			$("#PanelMoveList").children("select")
			.append(
				$('<option>')
					.html(data[i].MoveText)
					.attr({
						"data-RshCurrent": data[i].RshCurrent,
						"data-RshPrev": data[i].RshPrev,
						"data-LastMoveCode": data[i].LastMoveCode,
						"data-LastJsCode": data[i].LastJsCode,
					})
				);
	}
}

function SetBoardTrigger(obj){
	//console.log('呼び出します');
	$("#jsBoard").trigger('setBoard',obj);

}

