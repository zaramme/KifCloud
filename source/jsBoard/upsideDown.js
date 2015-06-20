/////////////////////////////////////////
// 盤面を逆さまにするクラス
/////////////////////////////////////////
;;;
var UpsideDown = (function() {
    // private methods
    var isUpsideDown = false;
    var setUpsideDown = function (b) {
        if ( b == isUpsideDown){
            return;
        }

        var posAreas = $(".board > .onboard");

        isUpsideDown = b;
        console.log("setUpdside = " + isUpsideDown);

        posAreas.each(function(){
            setPositionPointSymmetric($(this));
        });

        var methods = new moveMethods();

        var pieces = $('.piece')

        pieces.each(function(){
            var pc = new pieceConductor($(this));
            methods.appendImage($(this),pc.kindOfPiece, pc.isBlack, pc.isPromoted);

        })

        changeBoardImage(b);
        sortCapturedArea(null);
        if (b){
            $('#pos_bc').addClass('wc').removeClass('bc');
            $('#pos_wc').addClass('bc').removeClass('wc');
        } else {
            $('#pos_bc').addClass('bc').removeClass('wc');
            $('#pos_wc').addClass('wc').removeClass('bc');            
        }


    };

    var changeBoardImage = function(b){
        if (b){
            $(".board").css('background','url(\''+IMG_DIR+'/bg_u.png\')');            
        } else {
            $(".board").css('background','url(\''+IMG_DIR+'/bg.png\')');            
        }

    };
    var setPositionPointSymmetric = function(target){
        if (target.length != 1 ){
            return false;
        }
        var x = target.attr('id').charAt(4);
        var y = target.attr('id').charAt(5);

        if (isNaN(x) || isNaN(y)){
            return false;
        }

        var invartedX = invertNumber(x);
        var invertedY = invertNumber(y);

        if (isUpsideDown) {
            target.removeClass('x' + x);
            target.removeClass('y' + y);
            target.addClass('x' + invartedX);
            target.addClass('y' + invertedY);
        } else {
            target.removeClass('x' + invartedX);
            target.removeClass('y' + invertedY);
            target.addClass('x' + x);
            target.addClass('y' + y);            
        }
        return true;
    };

    var invertNumber = function(id){
        return id - (id - 5) * 2;
    };


    // public methods
    return {
    	getState: function(){
            return isUpsideDown;
    	},
        set: function(b){
            setUpsideDown(b);
        }
    }
}());