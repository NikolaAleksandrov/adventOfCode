
import _ from "lodash";
import { lcm } from 'mathjs'
class Node {
  constructor(){
    this.L = null
    this.R = null
    this.ChildL = null
    this.ChildR = null
    this.Lable = null
  }
  Lable: string | null;
  ChildL: string|null;
  ChildR: string|null;
  L: Node|null
  R: Node|null
}
let input = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`
const lns = input.split("\n");
const instructions = lns.shift()?.split('') ?? []
lns.shift()

const nodes = lns.map((v): Node => {
  const l = v.split(' = ')[0]
  const rawNodes = (v.split(' = ')[1]).replaceAll('(','').replaceAll(')', '')
  const nodeLables = rawNodes.split(', ')
  return {
    Lable: v.split(' = ')[0],
    ChildL: nodeLables[0],
    ChildR: nodeLables[1],
    L: null, R: null
  };
})
nodes.forEach((n) => {
  n.L = nodes.find(v => v.Lable == n.ChildL) ?? null
  n.R = nodes.find(v => v.Lable == n.ChildR) ?? null
})


let counter = 0
let startNodes = nodes.filter((n)=>n.Lable?.split('')[2]=='A')
const lnInst = instructions?.length ?? 0
const counts = startNodes.map((node) => {
  counter = 0
  while(true){
    if(node.Lable?.split('')[2] == 'Z') {
      break
    }
    
    if(instructions[counter%lnInst] == "R") {
      node = node.R ?? new Node()
    } else {
      node = node.L ?? new Node()
    }
    counter++
  }
  return counter
})

console.log(counts.reduce((a,b)=>lcm(a,b),1))