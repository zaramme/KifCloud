package controllers

import (
	"KifCloud/app/models/auth"
	"github.com/robfig/revel"
)

type Auth struct {
	*revel.Controller
}

func (c Auth) Login() revel.Result {

	json := make(map[string]interface{})
	res, token := auth.ConfirmToken(c.Session)

	if res {
		json["isConfirmed"] = true
		json["Token"] = token
	} else {
		json["isConfirmed"] = false
	}

	return c.RenderJson(json)
}

func (c Auth) GetToken() revel.Result {
	auth.GetToken(c.Session)

	return c.Redirect("/login")
}
