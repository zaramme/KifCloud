package controllers

import (
	kifu "KifCloud-Mapper/kifu"
	"github.com/robfig/revel"
	loader "github.com/zaramme/KifCloud-Logic/kifLoader"
	r "github.com/zaramme/KifCloud-Logic/routes"
	"os"
	"strings"
)

type Kifu struct {
	*revel.Controller
}

func (c Kifu) GetKifu(kifuID string) revel.Result {
	routes := kifu.GetKifu(kifuID)

	output := make([]map[string]string, len(routes))

	for i, route := range routes {
		output[i] = make(map[string]string)
		output[i]["RshPrev"] = route.Prev
		output[i]["RshCurrent"] = route.Current
		output[i]["LastMoveCode"] = route.Move.ToMoveCode()
		output[i]["LastJsCode"] = route.Move.ToJsCode()
		output[i]["MoveText"] = route.Move.ToJpnCode()
	}
	return c.RenderJson(output)
}

func (c Kifu) LoadText(kifText string) revel.Result {

	// 改行コードで変換
	slist := strings.SplitN(kifText, "\r\n", -1)

	// kifクラスに変換
	kif, err := loader.LoadStringList(slist)
	if err != nil {
		return c.RenderError(err)
	}

	// routesクラスに変換
	routes, err := r.NewRoutesFromKifuFile(kif)
	if err != nil {
		return c.RenderError(err)
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
	return c.RenderJson(output)
}

func (c Kifu) Upload(file *os.File) revel.Result {

	kif, err := loader.LoadKifFile(file)
	if err != nil || kif == nil {
		revel.INFO.Print("棋譜の読み込みに失敗しました")
		return c.RenderError(err)
	}

	_, err = kifu.PutKifu(kif, "uploader")

	if err != nil {
		revel.INFO.Print("棋譜のアップロードに失敗しました")
		return c.RenderError(err)
	}

	revel.INFO.Print("棋譜のアップロードに成功しました")

	// if err != nil {
	// 	revel.ERROR.Print("kifの変換に失敗しました")
	// 	return nil
	// }

	return nil
}

func (c Kifu) GetKifuCount() revel.Result {
	count, err := kifu.GetKifuCount()

	if err != nil {
		revel.INFO.Print("アップロード済み寄付総数の取得に失敗しました")
		return nil
	}

	output := make(map[string]int)
	output["count"] = count
	return c.RenderJson(output)
}

func (c Kifu) GetKifuInfoList(userID string) revel.Result {
	kifuInfoList, err := kifu.GetKifuListByUser(userID)

	if err != nil || kifuInfoList == nil {
		revel.INFO.Print("棋譜リストの取得に失敗しました")
		return nil
	}
	return c.RenderJson(kifuInfoList)
}
