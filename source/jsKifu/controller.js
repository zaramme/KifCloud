$(function(){
	debug("jsKifu/controller.jsを読み込みました");

	$("#PanelMoveList").ready(function(){
		// debug("panelmovelist読み込みを実行します");
//		 apiLoadKifu();
	});

	$("#PanelMoveList").on("pushKifuNode", function(ev,data){
		pushKifuNode(data)
	});
	$("#PanelMoveList").on("loadKifuWithJson", function(ev,data){
		//console.log("jsKifuが呼び出されました：loadKifuWithJson")
		//console.log(data);
		setKifuWithJson(data);
	});
	$("#PanelMoveList").children("select").change(function(){
		var selected = $(this).children(":selected")
		var lastJsCode = selected.attr('data-LastJsCode')
		//console.log('lastJsCode = ' + lastJsCode)
		if (selected.attr('data-LastJsCode') == undefined || selected.attr('data-LastMoveCode') == undefined){
			//sconsole.log("局面ノードが選択されました(最終手なし)");
			var rsh = selected.attr('data-RshCurrent');
			var moveCode = null;
		} else if (lastJsCode == 'END_OF_GAME')
		{
			//console.log("局面ノードが選択されました(終了)");			
			selected = selected.prev()
			var rsh = selected.attr('data-RshPrev');
			var LastJsCode = selected.attr('data-LastJsCode');
			var LastMoveCode = selected.attr('data-LastMoveCode');

		} else {
			var rsh = selected.attr('data-RshPrev');
			//console.log("局面ノードが選択されました(最終手あり)");
			var LastJsCode = selected.attr('data-LastJsCode');
			var LastMoveCode = selected.attr('data-LastMoveCode');
		}

		obj = {rsh:rsh,"LastJsCode":LastJsCode,"LastMoveCode":LastMoveCode};

		//console.log(obj);
		SetBoardTrigger(obj);
	});

});

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

	});
}

function pushKifuNode(data){
	//debug("局面をセットしています");
	//console.log("局面を追加します");
	//console.log(data);
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
		selected.next().prop('selected', true);
	}
	selected.prop('checked',false);
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

