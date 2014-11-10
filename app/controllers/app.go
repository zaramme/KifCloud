package controllers

import "github.com/robfig/revel"

type App struct {
	*revel.Controller
}

func (c App) Index() revel.Result {
	value1 := "hello world"
	values2 := []string{"this is a pen.", "my name is Taroh."}
	return c.Render(value1, values2)
}

func (c App) Value() revel.Result {
	values := []int{1, 2, 3, 4, 5}
	return c.RenderJson(values)
}
