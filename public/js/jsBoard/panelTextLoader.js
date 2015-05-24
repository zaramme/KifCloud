$(function(){
debug("panelTextLoader.jsを読み込みました");

$("#panelTextLoader").children("form").submit(function(event) {
	event.preventDefault();

	var form = $(this);

	apiDirectLoadText(form,null);

});

function apiDirectLoadText(form,callback){

	$.$.ajax({
		url: '/api/kifu/directTextLoader',
		type: 'POST',
		data: form.serialize(),
	})
	.done(function(data) {
		console.log("success");
		console.log(data);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
	url = 
	type = 
}