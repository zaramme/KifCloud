$(function(){
	$('[data-toggle=popover]').hover(function() {
		$(this).popover('show');
	}, function() {
		 $(this).popover('hide');
	});
	$('[data-toggle=tooltip]').click(function() {
		$(this).tooltip('hide');
	});

});


// エラーを表示する
function modalError(data){
	var methods = new modalMethods();
	methods.setHeaderTitle("<i class=\"fa fa-fw fa-frown-o\"></i> エラー");
	methods.setUtilButtonVisible(false);
	methods.setBody("申し訳ありません。KifCloudのシステムエラーが発生しました。<br>ページが正しく表示されていない可能性があるため、リロードをおすすめします。");
	$("#modal").modal('show');	
}


function modalMethods(){}


modalMethods.prototype.setBody = function(html){
	var header = this.getBody();
	header.html(html);
}

modalMethods.prototype.setHeaderTitle = function(html){
	var header = this.getHeader();
	header.html(html);
}

modalMethods.prototype.setUtilButtonVisible = function(visible){
	var button = this.getFooter().children('.btn-util');

	if(!visible){
		button.hide();
	}
}

modalMethods.prototype.getContent = function(){
	var target = $("#modal > .modal-dialog > .modal-content");
	return target;
}

modalMethods.prototype.getHeader = function(){
	var target = this.getContent().children(".modal-header").children(".modal-title");
	return target;
}

modalMethods.prototype.getFooter = function(){
	var target = this.getContent().children(".modal-footer");
	return target;
}

modalMethods.prototype.getBody = function(){
	var target = this.getContent().children(".modal-body");
	return target;
}


modalMethods.prototype.get