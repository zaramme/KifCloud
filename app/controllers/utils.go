package controllers

import (
	//b "KifuLibrary-Logic/board"
	//rsh "KifuLibrary-Logic/rsh"
	// /	"KifCloud/app/models/auth"
	//m "KifuLibrary-Logic/move"
	"github.com/robfig/revel"
)

type Utils struct {
	*revel.Controller
}

func (c Utils) TextLoader(kifText []byte) revel.Result {
	revel.INFO.Printf("kiftext = %s", string(kifText))
	return c.Render(string(kifText))
}
