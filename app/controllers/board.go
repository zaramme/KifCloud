package controllers

import (
	b "KifuLibrary-Logic/board"
	j "KifuLibrary-Logic/jsonConverter"
	m "KifuLibrary-Logic/move"
	rsh "KifuLibrary-Logic/rsh"
	"github.com/robfig/revel"
)

type Board struct {
	*revel.Controller
}

func (c Board) Init() revel.Result {
	brd := b.NewBoardInit()
	json, _ := j.BoardToJson(brd)
	return c.RenderJson(json)
}

func (c Board) GetBoard(code string) revel.Result {
	r, _ := rsh.NewRshCodeFromString(code)
	brd := rsh.BuildBoardFromRshCode(r)
	json, _ := j.BoardToJson(brd)
	return c.RenderJson(json)
}

func (c Board) GetBoardWithMove(code, move string) revel.Result {
	r, _ := rsh.NewRshCodeFromString(code)
	brd := rsh.BuildBoardFromRshCode(r)

	mv := m.NewMoveFromMoveCode(move)
	if mv == nil {
		return c.RenderJson("nil")
	}

	json, _ := j.BoardToJson(brd)
	json.AppendLastMove(mv)
	return c.RenderJson(json)
}

func (c Board) Test(str string) revel.Result {
	if len(str) > 0 {
		return c.RenderJson(str)
	}
	return c.RenderJson("test is clear")
}
