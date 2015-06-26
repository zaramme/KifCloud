/////////////////////////////////////////
// 継ぎ盤機能を実装するクラス
/////////////////////////////////////////

// 特定RSHに対しての継ぎ盤を保持、表示する
var jkfNodeSwitcher = (function() {

    // private members

    // 特定のrshに対してノードが存在するかどうかを保持
    var nodeList = {};

    var showNode = function(){
        console.log("<<SHOW NODES>>");
         $('#jkf-show-node').tab('show');
    }

    var hideNode = function(){
        console.log("<<HIDDEN NODES>>");
         $('#jkf-show-node').tab('show');        
    }

    // public methods
    return {
    	showNode: function(){
            showNode();
    	},

        getNode: function(){

        }
    }
}());

// root, node　のアクティブ状態を保持する
var jkfRoNSelector = (function(){

    var active = 0;

    var activateRoN = function(id){};

//    getSelectedObject = function(id){    };

    return {
        getSelected: function(){
            return getSelectedObject(id);
        },
        set: function(id){
            activateRoN(id);
        }
    }

}());