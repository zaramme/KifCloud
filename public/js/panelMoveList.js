$(function(){
debug("panelMoveList.jsを読み込みました");

function apiLoadKifu(){
	kifuID = 88888;
	fileurl = '/api/kifu/' + kifuID;
	debug("api通信：api.kifu param ... " + kifuID);

	$.ajax({
		url: fileurl,
		dataType: 'json',
		success: function(data){
				debug("--棋譜が読み込まれました");
				setMoveList(data);
		},
	});
}

function setMove(data){
	debug("局面をセットしています");
	var selected = $("#PanelMoveList").children("select").children(":selected");
	selected.after(
		$('<option>')
			.html(data.MoveText)
			.attr({
				"data-rshCurrent": data.Current,
				"data-rshPrev": data.Prev,
				"data-move": data.Move,
			})
	);
}
function setMoveList(data){
		debug("--棋譜をセットしています");
	for (var i = 0, len = data.length; i < len; i++){
			$("#PanelMoveList").children("select")
			.append(
				$('<option>')
					.html(data[i].MoveText)
					.attr({
						"data-rshCurrent": data[i].Current,
						"data-rshPrev": data[i].Prev,
						"data-move": data[i].Move,
						"data-moveCode": data[i].MoveCode,
					})
				);
	}
}
$("#PanelMoveList").children("select").change(function(){
	var selected = $(this).children(":selected")
	var rsh = selected.attr('data-rshPrev');
	var moveCode = selected.attr('data-moveCode');

//	console.log(rsh);
	apiReloadwithMoveCode(rsh,moveCode);

})

$("#PanelMoveList").ready(function(){
	debug("panelmovelist読み込みを実行します");
	apiLoadKifu();
})

});

