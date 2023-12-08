import * as fs from 'fs';
let input = ``;

// input = `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`

let map: string[][] = [[]];
// input = input.replaceAll(/[^0-9.\n]/g, "#");

const lns = input.split("\n");
for (let i = 0; i < lns.length; i++) {
  map[i] = lns[i].split("");
}
let ans: number = 0
for( let i = 0; i< map.length; i++) {
  let lineNum: number[] = []
  let shouldParse = false
  for( let j = 0; j< map[i].length; j++) {
    const num = Number.parseInt(map[i][j])
    if(!Number.isNaN(num)) {
      lineNum.push(num)
      shouldParse = !shouldParse? hasCharacter(j,i) : true
    } else {
      if (shouldParse && lineNum.length>0) {
        //console.log(toNumber(lineNum), lineNum);
        ans += toNumber(lineNum)
        for (let m=j-lineNum.length ; m < j; m++) {
          map[i][m] = '0'
        }
      }
      lineNum = []
      shouldParse = false
    }
    
  }
}
fs.writeFile("koko.txt",(map.map(row => row.join(''))).join('\n'),(err) => {console.error(err) })

console.log(ans)
function toNumber(input: number[]): number {
  let ans = 0
  for (let i = input.length; i>0; i--) {
    ans+=input[i-1]*10**(input.length-i)
  }
  return ans
}
function hasCharacter(x: number, y: number): boolean {
  const xMax = map[0].length
  const yMax = map.length

  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      if (
        i >= 0 && i < yMax && j >= 0 &&j < xMax &&
        Number.isNaN(Number.parseInt(map[i][j])) && map[i][j] != '.'
      ) {
        return true;
      }
    }
  }
  return false;
}
