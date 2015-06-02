package controllers

import (
	//kifu "KifCloud-Mapper/kifu"
	"github.com/robfig/revel"
	loader "github.com/zaramme/KifCloud-Logic/kifLoader"
	r "github.com/zaramme/KifCloud-Logic/routes"
	"os"
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

func (c Kifu) GetKifu(kifuID string) revel.Result {
	// routes := kifu.GetKifu(kifuID)

	// output := make([]map[string]string, len(routes))

	// for i, route := range routes {
	// 	output[i] = make(map[string]string)
	// 	output[i]["RshPrev"] = route.Prev
	// 	output[i]["RshCurrent"] = route.Current
	// 	output[i]["LastMoveCode"] = route.Move.ToMoveCode()
	// 	output[i]["LastJsCode"] = route.Move.ToJsCode()
	// 	output[i]["MoveText"] = route.Move.ToJpnCode()
	// }
	// return c.RenderJson(output)
	return c.RenderJson(nil)
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

func (c Kifu) Upload(file *os.File) revel.Result {

	// kif, err := loader.LoadKifFile(file)
	// if err != nil || kif == nil {
	// 	revel.INFO.Print("棋譜の読み込みに失敗しました")
	// 	return c.RenderError(err)
	// }

	// _, err = kifu.PutKifu(kif, "uploader")

	// if err != nil {
	// 	revel.INFO.Print("棋譜のアップロードに失敗しました")
	// 	return c.RenderError(err)
	// }

	// revel.INFO.Print("棋譜のアップロードに成功しました")

	// // if err != nil {
	// // 	revel.ERROR.Print("kifの変換に失敗しました")
	// // 	return nil
	// // }

	// return nil
	return c.Render()
}

func (c Kifu) GetKifuCount() revel.Result {
	// count, err := kifu.GetKifuCount()

	// if err != nil {
	// 	revel.INFO.Print("アップロード済み寄付総数の取得に失敗しました")
	// 	return nil
	// }

	// output := make(map[string]int)
	// output["count"] = count
	return c.RenderJson(0)
}

func (c Kifu) GetKifuInfoList(userID string) revel.Result {
	// kifuInfoList, err := kifu.GetKifuListByUser(userID)

	// if err != nil || kifuInfoList == nil {
	// 	revel.INFO.Print("棋譜リストの取得に失敗しました")
	// 	return nil
	// }
	return c.RenderJson(nil)
}
