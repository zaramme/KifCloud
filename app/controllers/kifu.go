package controllers

import (
	"github.com/revel/revel"
	loader "github.com/zaramme/KifCloud-Logic/kifLoader"
	r "github.com/zaramme/KifCloud-Logic/routes"
	"strings"
)

type Kifu struct {
	*revel.Controller
}

type JsonLoadText struct {
	StatusCode int
	Message    string
	Data       []map[string]string
}

func (c Kifu) Index() revel.Result {
	return c.Render()
}

func (c Kifu) LoadText(kifText string) revel.Result {
	var json JsonLoadText
	json.StatusCode = 0

	if len(kifText) == 0 {
		json.StatusCode = 10
		json.Message = "文字列を入力してください"
		return c.RenderJson(json)
	}

	// 改行コードで変換
	slist := strings.SplitN(kifText, "\r\n", -1)

	getMessage := func(err error) string {
		if errUser, ok := err.(loader.ErrorForUser); ok {
			return errUser.UserError
		} else {
			return "システムエラー：管理者にお問い合わせください"
		}
	}

	// kifクラスに変換
	kif, err := loader.LoadStringList(slist)
	if err != nil {
		json.StatusCode = 10
		json.Message = getMessage(err)
		return c.RenderJson(json)
	}

	// routesクラスに変換
	routes, err := r.NewRoutesFromKifuFile(kif)
	if err != nil {
		json.StatusCode = 10
		json.Message = getMessage(err)
		return c.RenderJson(json)
	}

	output := make([]map[string]string, len(routes))

	for i, route := range routes {
		output[i] = make(map[string]string)
		output[i]["RshPrev"] = route.Prev
		output[i]["RshCurrent"] = route.Current
		output[i]["LastMoveCode"] = route.Move.ToMoveCode()
		output[i]["LastJsCode"] = route.Move.ToJsCode()
		output[i]["MoveText"] = route.Move.ToJpnCode()
	}

	json.Data = output

	return c.RenderJson(json)
}
