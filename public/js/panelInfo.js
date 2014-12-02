$(function(){
debug("panelInfo.jsを読み込みました");


$("#RshPanel").on("reloadPanel", function(ev){
	$("#RshPanel").children("form").children("input").attr("value", document.info.rsh.value)
})
});

