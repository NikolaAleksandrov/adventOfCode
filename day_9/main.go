package main

import (
	_ "embed"
	"fmt"
	"strconv"
	"strings"
)

//go:embed input.txt
var puzzelInput string

func main() {
	ln := strings.Split(puzzelInput, "\r\n")
	ans := 0
	for _, l := range ln {
		_, s := processLine(l)
		ans += s
	}
	fmt.Println(ans)
}

func processLine(ln string) (int, int) {
	charNumbers := strings.Split(ln, " ")
	lineNums := make([]int, 0, len(charNumbers))
	for _, c := range charNumbers {
		num, _ := strconv.Atoi(c)
		lineNums = append(lineNums, num)
	}
	b := false
	diffs := make([][]int, 0)
	diffs = append(diffs, lineNums)
	for !b {
		var newDiff []int
		newDiff, b = calcDiff(diffs[len(diffs)-1])
		diffs = append(diffs, newDiff)
	}

	return calcNext(diffs), calcStart(diffs)
}

func calcDiff(input []int) ([]int, bool) {
	output := make([]int, 0, len(input)-1)
	hasZeros := true
	for i, num := range input {
		if i == 0 {
			continue
		}
		diff := num - input[i-1]
		if diff != 0 {
			hasZeros = false
		}
		output = append(output, diff)
	}
	return output, hasZeros
}

func calcNext(input [][]int) int {
	ans := 0
	for i := len(input) - 2; i >= 0; i-- {
		ans += input[i][len(input[i])-1]
	}
	return ans
}

func calcStart(input [][]int) int {
	s := 0
	for i := len(input) - 1; i >= 0; i-- {
		s = input[i][0] - s
	}
	return s
}
