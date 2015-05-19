package controllers

import (
	b "KifuLibrary-Logic/board"
	rsh "KifuLibrary-Logic/rsh"
	// /	"KifCloud/app/models/auth"
	m "KifuLibrary-Logic/move"
	"github.com/robfig/revel"
)

type App struct {
	*revel.Controller
}

func (c App) Index(code string, move string) revel.Result {
	var currentCode string
	if len(code) == 0 {
		return c.Render()
	}
	moveObj := m.NewMoveFromMoveCode(move)
	if moveObj == nil {
		currentCode = code
		return c.Render(currentCode)
	}

	rshObj, err := rsh.NewRshCodeFromString(code)
	if err != nil {
		return c.Render()
	}
	var brd *b.Board
	brd = rsh.BuildBoardFromRshCode(rshObj)
	if err != nil {
		return c.Render()
	}
	brd.AddMove(moveObj)
	currentRsh := rsh.ConvertRshFromBoard(brd)
	currentCode = currentRsh.ToString()
	previousCode := code
	moveCode := moveObj.ToJsCode()
	return c.Render(previousCode, moveCode, currentCode)
}

// func (c App) GetToken() revel.Result {

// 	json := make(map[string]interface{})

// 	return c.RenderJson(res)
// }

func (c App) Submit() revel.Result {
	return c.Render()
}

func (c App) About() revel.Result {
	return c.Render()
}
