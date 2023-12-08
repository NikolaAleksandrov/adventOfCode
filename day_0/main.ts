
let input1 =``
let sum = 0
for (const item of input1.split('\n')) {
    sum+=decodeNumberV2(item)
}

console.log(sum)

function decodeNumber(input) {
    let first = NaN
    let last = NaN
    for(const c of input.split('')) {
        const i = Number.parseInt(c)
        if (!Number.isNaN(i)) {
            if (Number.isNaN(first)) {
                first = i
                continue
            }
            last = i
        }
    }
    if (!Number.isNaN(last)) {
        return (first*10)+last
    }
    return first*10+first
}

function decodeNumberV2(input) {
    const numWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    let first = NaN
    let last = NaN
    const arr = input.split('')
    for(let i =0;i<arr.length; i++ ) {
        const num = Number.parseInt(arr[i])
        if (!Number.isNaN(num)) {
            if (Number.isNaN(first)) {
                first = num
                continue
            }
            last = num
            continue
        }
        const bla = input.substring(i)
        for(let j =0;j<numWords.length; j++ ) {
            if (bla.indexOf(numWords[j]) == 0) {
                if (Number.isNaN(first)) {
                    first = j+1
                    break;
                }
                last = j+1
                break
            }
        }
    }
    if (!Number.isNaN(last)) {
        return (first*10)+last
    }
    return first*10+first
}
