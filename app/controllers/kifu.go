package controllers

import (
	kifu "KifCloud-Mapper/kifu"
	loader "KifuLibrary-Logic/kifLoader"
	"github.com/robfig/revel"
	"os"
)

type Kifu struct {
	*revel.Controller
}

func (c Kifu) GetKifu(kifuID string) revel.Result {
	routes := kifu.GetKifu(kifuID)

	output := make([]map[string]string, len(routes))

	for i, route := range routes {
		output[i] = make(map[string]string)
		output[i]["Prev"] = route.Prev
		output[i]["Move"] = route.Move.ToMoveCode()
		output[i]["MoveText"] = route.Move.ToJpnCode()
		output[i]["Current"] = route.Current
	}
	return c.RenderJson(output)
}

func (c Kifu) Upload(file *os.File) revel.Result {

	kif, err := loader.LoadKifFileCont(file)
	if err != nil {
		revel.INFO.Print("棋譜の読み込みに失敗しました")
		return nil
	}

	_, err = kifu.PutKifu(kif, "uploader")

	if err != nil {
		revel.INFO.Print("棋譜のアップロードに失敗しました")
		return nil
	}

	revel.INFO.Print("棋譜のアップロードに成功しました")

	// if err != nil {
	// 	revel.ERROR.Print("kifの変換に失敗しました")
	// 	return nil
	// }

	return nil
}
