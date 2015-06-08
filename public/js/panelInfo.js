$(function(){
debug("panelInfo.jsを読み込みました");


$("#RshPanel").on("reloadPanel", function(ev){
	debug("rshPanelをリロードシミアス。");
	if (document.info.RshCurrent == undefined)
		return

	url = getHost() + 'board/' + document.info.RshCurrent.value
	$("#RshPanel").children("textarea").html(url);
})
});

