$(function(){
debug("panelInfo.jsを読み込みました");

const RSH_BOARD = "localhost:9000/board/"

$("#RshPanel").on("reloadPanel", function(ev){
	debug("rshPanelをリロードシミアス。");
	if (document.info.RshCurrent == undefined)
		return

	url = RSH_BOARD + document.info.RshCurrent.value
	$("#RshPanel").children("textarea").html(url);
})
});

