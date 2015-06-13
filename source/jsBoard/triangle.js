$(function(){

	// 三角マーカー(左)の表示設定
	$('.board').children('.tri-prev').hover(function() {
		$(this).css('border-right-color','rgba(211,84,0,0.6)');
	}, function() {
		$(this).css('border-right-color','#dddddd');
	})
	.mousedown(function(event) {
		$(this).css('border-right-color','#dddddd');
	})
	.click(function(event) {
		$("#PanelMoveList").trigger('jkfScrollPrev');
	})
	.mouseup(function(event) {
		$(this).css('border-right-color','rgba(211,84,0,0.6)');
	});;

	// 三角マーカー(右)の表示設定
	$('.board').children('.tri-next').hover(function() {
		$(this).css('border-left-color','rgba(211,84,0,0.6)');
	}, function() {
		$(this).css('border-left-color','#dddddd');
	})
	.click(function(event) {
		$("#PanelMoveList").trigger('jkfScrollNext');
	})
	.mousedown(function(event) {
		$(this).css('border-left-color','#dddddd');
	})
	.mouseup(function(event) {
		$(this).css('border-left-color','rgba(211,84,0,0.6)');
	});;

	// イベントリスナー
	$('.board').on('jbdSetTriangleExist',function(ev,data){
		var methods = new triangleMethods();
		methods.setExist(data);
	});

});

function triangleMethods(){}

// トライアングルの表示・非表示の切り替え
triangleMethods.prototype.setExist = function(data){
	if (data["prev"] == true){
		$('.board').children('.tri-prev').show()
	}

	if (data["prev"] == false){
		$('.board').children('.tri-prev').hide()
	}

	if (data["next"] == true){
		$('.board').children('.tri-next').show()
	}

	if (data["next"] == false){
		$('.board').children('.tri-next').hide()		
	}
};