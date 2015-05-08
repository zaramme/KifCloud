package controllers

import (
	// /	"KifCloud/app/models/auth"
	m "KifuLibrary-Logic/move"
	"github.com/robfig/revel"
)

type App struct {
	*revel.Controller
}

func (c App) Index(code string, move string) revel.Result {
	if len(code) == 0 {
		return c.Render()
	}
	moveObj := m.NewMoveFromMoveCode(move)
	if moveObj == nil {
		currentCode := code
		return c.Render(currentCode)
	}
	previousCode := code
	moveCode := moveObj.ToJsCode()
	return c.Render(previousCode, moveCode)
}

// func (c App) GetToken() revel.Result {

// 	json := make(map[string]interface{})

// 	return c.RenderJson(res)
// }

func (c App) Submit() revel.Result {
	return c.Render()
}
