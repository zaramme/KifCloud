$(function(){
debug("panelDescription.jsを読み込みました");

function apiLoadDescription(){
	fileurl = '/api/description/' + document.info.rsh.value 
	debug("api通信：api.description param ... " + document.info.rsh.value);

	$.ajax({
		url: fileurl,
		dataType: 'json',
		success: function(data){
				debug("--局面テキストが読み込まれました");
				debug("--"+ data.text);
				setDescription(data);
		},
	});
}

function apiPutDescription(formObj){
	fileurl = '/api/description/' + document.info.rsh.value;
	$.ajax({
		url: fileurl,
		type: "PUT",
		data: formObj.serialize(),
        dataType: 'text',
		timeout: 10000,
		success: function(data){
				debug("テキストのputが完了しました");
				apiLoadDescription();
		}
	});
}

function setDescription(data) {
	if ( data.text != null )
	{
		$("#PanelDescription").children("#Description").text(data.text);
	}
	else
	{
		$("#PanelDescription").children("#Description").text("(未登録)");
	}
}

// 送信時の処理
$("#pnldesc_form").submit(function(event){
	 event.preventDefault();
	 apiPutDescription($(this));
	});

// RSH取得時の処理
$("#PanelDescription").on("reloadPanel", function(ev){
	debug("-- PanelDescriptionの更新処理を行います");
	apiLoadDescription();
	});

});