package controllers

import (
	// /	"KifCloud/app/models/auth"
	"github.com/robfig/revel"
)

type App struct {
	*revel.Controller
}

func (c App) Index(code string) revel.Result {
	if len(code) > 0 {
		return c.Render(code)
	} else {
		return c.Render()
	}
}

// func (c App) GetToken() revel.Result {

// 	json := make(map[string]interface{})

// 	return c.RenderJson(res)
// }

func (c App) Submit() revel.Result {
	return c.Render()
}
