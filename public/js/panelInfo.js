$(function(){
debug("panelInfo.jsを読み込みました");


$("#RshPanel").on("reloadPanel", function(ev){
	debug("rshPanelをリロードシミアス。");
	$("#RshPanel").children("input").attr("value", document.info.rsh.value)
})
});

