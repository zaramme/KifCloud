package controllers

import (
	b "KifCloud-Mapper/board"
	"github.com/robfig/revel"
)

type Panel struct {
	*revel.Controller
}

func (c Panel) GetDescription(code string) revel.Result {

	board := b.GetBoardItem(code)
	v := make(map[string]string)
	for t, s := range board.Item {
		v[t] = s.S
	}
	return c.RenderJson(v)
}

func (c Panel) PutDescription(code string) revel.Result {
	revel.INFO.Print("PutDescription::開始")

	v := c.Params.Values.Get("pnldesc_text")
	if len(v) != 0 {
		revel.INFO.Printf("-- pnldesc_test ... %s", v)
	}

	values := make(map[string]interface{})

	values["RSH"] = code
	values["text"] = v

	result := b.PutBoardItem(values)

	if result == nil {
		revel.INFO.Print("DB書き込みが正常に終了しました。")
	} else {
		revel.INFO.Printf("DB書き込みエラー：%s", result.Error())
	}
	return nil
}
