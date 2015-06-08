package controllers

import (
	"github.com/revel/revel"
	b "github.com/zaramme/KifCloud-Logic/board"
	m "github.com/zaramme/KifCloud-Logic/move"
	rsh "github.com/zaramme/KifCloud-Logic/rsh"
)

type App struct {
	*revel.Controller
}

func (c App) Index(code string, move string) revel.Result {
	var currentCode = code
	if len(code) == 0 {
		return c.Render()
	}

	var errString string

	//RSHが正しいかどうか判定するクロージャ
	isValidRsh := func(rshString string) bool {
		rshObj, err := rsh.NewRshCodeFromString(rshString)
		if err != nil {
			errString = "不正なRSHです。"
			return false
		}
		brd := rsh.BuildBoardFromRshCode(rshObj)

		isValid, s := brd.IsValid()
		if !isValid {
			errString = s
			return false
		}
		return true
	}

	moveObj := m.NewMoveFromMoveCode(move)
	if moveObj == nil {
		if !isValidRsh(code) {
			revel.INFO.Print("盤面状態が不正です。err = %s ", errString)
			return c.Redirect("/board/notfound")
		}
		return c.Render(currentCode)
	}

	rshObj, err := rsh.NewRshCodeFromString(code)
	if err != nil {
		return c.Redirect("/board/notfound")
	}
	var brd *b.Board
	brd = rsh.BuildBoardFromRshCode(rshObj)
	if err != nil {
		return c.Redirect("/board/notfound")
	}
	brd.AddMove(moveObj)
	currentRsh, nil := rsh.ConvertRshFromBoard(brd)
	if err != nil {
		return c.Redirect("/board/notfound")
	}
	currentCode, err = currentRsh.ToString()
	if err != nil {
		return c.Redirect("/board/notfound")
	}
	previousCode := code
	moveCode := moveObj.ToJsCode()
	return c.Render(previousCode, moveCode, currentCode)
}

func (c App) About() revel.Result {
	return c.Render()
}
func (c App) Release() revel.Result {
	return c.Render()
}

func (c App) BoardNotFound() revel.Result {
	return c.Render()
}
