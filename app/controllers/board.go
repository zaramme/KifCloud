package controllers

import (
	"github.com/robfig/revel"
	b "github.com/zaramme/KifCloud-Logic/board"
	j "github.com/zaramme/KifCloud-Logic/jsonConverter"
	m "github.com/zaramme/KifCloud-Logic/move"
	rsh "github.com/zaramme/KifCloud-Logic/rsh"
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
