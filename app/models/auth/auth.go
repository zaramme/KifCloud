package auth

import (
	"github.com/robfig/revel"
	//	"golang.org/x/oauth2"
)

func ConfirmToken(session revel.Session) (isConfirm bool, UserName string) {
	if t, ok := session["token"]; ok {
		return true, t
	} else {
		return false, "0"

	}

	return false, "0"
}

func GetFacebookAuth() {
	// conf := &oauth2.Config{
	// 	ClientID:     "819348828128151",
	// 	ClientSecret: "819348828128151",
	// 	Scopes:       []string{},
	// 	Endpoint: oauth2.Endpoint{
	// 		AuthURL:  "",
	// 		TokenURL: "",
	// 	},
	// }

}

func GetToken(session revel.Session) {
	session["token"] = "123"
}
