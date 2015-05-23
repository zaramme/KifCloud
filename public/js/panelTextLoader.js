$(function(){

console.log("panelTextLoader.jsを読み込みました");
mainPanelTextLoader();

});


function mainPanelTextLoader(){
	var form = $("#panelTextLoader").find("form");

	form.submit(function(event) {
		console.log("読み込みボタンが押されました");

		// 通常のフォーム送信をブロック
		event.preventDefault();

		apiDirectLoadText(form,null);
	});

}

function LoadDirectTextTrigger(data){
	console.log("trigger");
	$("#PanelMoveList").trigger('loadKifuWithJson',{"json":data});
}

function apiDirectLoadText(form,callback){

	var button = form.find("input")

	$.ajax({
		url: '/api/kifu/directTextLoader',
		type: 'POST',
		data: form.serialize(),
        beforeSend: function(xhr, settings) {
            // ボタンを無効化し、二重送信を防止
            button.attr('disabled', true);
        },
		success:function(data) {
			LoadDirectTextTrigger(data);
		},
        // 応答後
        complete: function(xhr, textStatus) {
            // ボタンを有効化し、再送信を許可
            button.attr('disabled', false);
        }
	});
}

