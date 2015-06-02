$(function(){

console.log("panelTextLoader.jsを読み込みました");
mainPanelTextLoader();
});


function mainPanelTextLoader(){
	var form = $("#panelTextLoader").find("form");
	var kifInput = form.children("div").children("#kifTextInput");

	kifInput.children('label').hide();

	form.submit(function(event) {
		console.log("読み込みボタンが押されました");

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
	console.log("trigger");
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