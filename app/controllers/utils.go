package controllers

import (
	//b "github.com/zaramme/KifCloud-Logic/board"
	//rsh "github.com/zaramme/KifCloud-Logic/rsh"
	// /	"KifCloud/app/models/auth"
	//m "github.com/zaramme/KifCloud-Logic/move"
	"github.com/robfig/revel"
)

type Utils struct {
	*revel.Controller
}

func (c Utils) TextLoader(kifText []byte) revel.Result {
	// revel.INFO.Printf("kiftext = %s", string(kifText))
	return c.Render()
}
