package tests

import "github.com/revel/revel/testing"

type AppTest struct {
	testing.TestSuite
}

func (t *AppTest) TestIndex_初期盤面() {
	t.Get("/board/cIh2klfLECLGMPtU2o0e4RpgUghsg-9TEWnBF0")
	t.AssertOk()
	value := "name=\"RshCurrent\" value=\"cIh2klfLECLGMPtU2o0e4RpgUghsg-9TEWnBF0\""
	t.AssertContains(value)
	t.AssertContentType("text/html; charset=utf-8")
}

func (t *AppTest) TestIndex_rshAndMove() {
	t.Get("/board/cIh2klfLECLGMPtU2o0e4RpgUghsg-9TEWnBF0/b76FU_77")
	t.AssertOk()
	value := "name=\"RshPrev\" value=\"cIh2klfLECLGMPtU2o0e4RpgUghsg-9TEWnBF0\""
	t.AssertContains(value)
	value = "name=\"LastJsCode\" value=\"77,76,FU,false\""
	t.AssertContains(value)
	value = "name=\"LastMoveCode\" value=\"b76FU_77\""
	t.AssertContains(value)
	t.AssertContentType("text/html; charset=utf-8")
}
