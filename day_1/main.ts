const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`


let ans = 0;
for (const ln of input.split("\n")) {
  const {game,r,g,b}= parsLine(ln);
  
    ans+=(r*g*b)
}
console.log(ans)

function parsLine(line: string): {
  game: number;
  r: number;
  g: number;
  b: number;
} {
  let maxR :number = 0;
  let maxG :number = 0;
  let maxB :number = 0;
  const gameTitle = line.split(":")[0];
  const pulls = line.split(":")[1].split(";");
  for (const pull of pulls) {
    const {r,g,b}= parsPull(pull)
      maxR= r>maxR ? r:maxR
      maxG= g>maxG ? g:maxG
      maxB= b>maxB ? b:maxB
  }
  return { game: parsGameTitle(gameTitle), r: maxR, g: maxG, b: maxB };
}

function parsGameTitle(input: string): number {
  return Number.parseInt(input.substring(4));
}

//6 red, 1 blue, 3 green;
function parsPull(input: string): {
  r: number;
  g: number;
  b: number;
} {
  let r,g,b = 0;
  for(const cube of input.split(',')) {
    const idxR = cube.indexOf('red')
    if(idxR>0) {
      r = Number.parseInt(cube.substring(1,idxR))
      continue
    }
    const idxG = cube.indexOf('green')
    if(idxG>0) {
      g = Number.parseInt(cube.substring(1,idxG))
      continue
    }
    const idxB = cube.indexOf('blue')
    if(idxB>0) {
      b = Number.parseInt(cube.substring(1,idxB))
      continue
    }
    
  }
  return {r:Number(r),g:Number(g),b:Number(b)};
}
