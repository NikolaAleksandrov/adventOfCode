
import _ from "lodash";
const cardIndex = new Map<string, number>();
cardIndex.set('A', 14)
cardIndex.set('K', 13)
cardIndex.set('Q', 12)
cardIndex.set('J', 1)
cardIndex.set('T', 10)
cardIndex.set('9', 9)
cardIndex.set('8', 8)
cardIndex.set('7', 7)
cardIndex.set('6', 6)
cardIndex.set('5', 5)
cardIndex.set('4', 4)
cardIndex.set('3', 3)
cardIndex.set('2', 2)

let input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`


const lns = input.split("\n");
let ans: number = 0
lns.sort((a,b)=>compare(a.split(' ')[0],b.split(' ')[0]))
for (let i = 0; i< lns.length; i++) {
  ans+=(i+1)*Number.parseInt(lns[i].split(' ')[1])
}
console.log(ans)


// console.log(compare("T55J5","KK677"))
function compare(a: string, b: string): number {
  const aCards = a.split('')
  const bCards = b.split('')
  const aType = getCardsType(aCards)
  const bType = getCardsType(bCards)
  if (aType != bType) {
    return aType>bType?1:-1
  }
  for (let i = 0; i < 5; i++) {
    if (a[i]!=b[i]) {
      return Number(cardIndex.get(a[i]))>Number(cardIndex.get(b[i]))? 1:-1
    }
  }
  
  return 0
}
console.error(cardIndex.get('J'))
console.error(getCardsType("2233J".split("")))
function getCardsType(cards: string[]): number {
  const gCards = _.groupBy(cards, c => c)
  const jokers = gCards['J']?.length ?? 0
  gCards['J'] = []
  const a = _.orderBy(gCards,[(g:string[]) => g.length],['desc'])
  
  let mostRepeated = 0;
  if (!!a[0]?.length) {
    mostRepeated = a[0].length + jokers
  } else {
    console.log("sad")
    mostRepeated = jokers
  }

  if(mostRepeated == 5) {
    return 5
  }
  if(mostRepeated == 4) {
    return 4
  }
  if(mostRepeated == 3 && a[1].length == 2) {
    return 3.5
  }
  if(mostRepeated == 3) {
    return 3
  }
  if(mostRepeated == 2 && a[1].length == 2) {
    return 2
  }
  if(mostRepeated == 2) {
    return 1
  }
  // console.error('stop')
  return 0
}