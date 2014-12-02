// GENERATED CODE - DO NOT EDIT
package routes

import "github.com/robfig/revel"


type tApp struct {}
var App tApp


func (_ tApp) Index(
		code string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "code", code)
	return revel.MainRouter.Reverse("App.Index", args).Url
}


type tBoard struct {}
var Board tBoard


func (_ tBoard) Init(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("Board.Init", args).Url
}

func (_ tBoard) GetBoard(
		code string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "code", code)
	return revel.MainRouter.Reverse("Board.GetBoard", args).Url
}

func (_ tBoard) GetBoardWithMove(
		code string,
		move string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "code", code)
	revel.Unbind(args, "move", move)
	return revel.MainRouter.Reverse("Board.GetBoardWithMove", args).Url
}

func (_ tBoard) Test(
		str string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "str", str)
	return revel.MainRouter.Reverse("Board.Test", args).Url
}


type tPanel struct {}
var Panel tPanel


func (_ tPanel) GetDescription(
		code string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "code", code)
	return revel.MainRouter.Reverse("Panel.GetDescription", args).Url
}

func (_ tPanel) PutDescription(
		code string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "code", code)
	return revel.MainRouter.Reverse("Panel.PutDescription", args).Url
}


type tStatic struct {}
var Static tStatic


func (_ tStatic) Serve(
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.Serve", args).Url
}

func (_ tStatic) ServeModule(
		moduleName string,
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "moduleName", moduleName)
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.ServeModule", args).Url
}


type tTestRunner struct {}
var TestRunner tTestRunner


func (_ tTestRunner) Index(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("TestRunner.Index", args).Url
}

func (_ tTestRunner) Run(
		suite string,
		test string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "suite", suite)
	revel.Unbind(args, "test", test)
	return revel.MainRouter.Reverse("TestRunner.Run", args).Url
}

func (_ tTestRunner) List(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("TestRunner.List", args).Url
}


