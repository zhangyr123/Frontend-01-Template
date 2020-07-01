/**
 * match(str, index)
 * 每次匹配都是从index开始遍历，每次只匹配一个类型，检测到其他类型便结束和返回
 * 返回lastIndex（作为下一次遍历的起始位置）以及返回匹配到的字符串
 */

// [0-9\.]+       " "        [\r\n]          +    -   *     /
// ["Number", "WhiteSpace", "LineTerminator", "+", "-", "*", "/"]

function match(str, index) {
    let state = start
    let text = ''
    let stateCode
    for(let i = index; i < str.length; i++) {
        // console.log(str[i])
        let _state = state(str[i], text)
        state = _state[0]
        stateCode = _state[1]
        text = _state[2]
        if(state === end) break
    }
    // console.log(text)
    let len = text.length
    if(len === 0) return null
    return {
        "val": stateCode == 0 ? Number(text) : text,
        "lastIndex": index + len,
        "stateCode": stateCode
    }
}

function start(c, text) {
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c)) {
        return [foundNumber, 0, text + c]
    }
    if(c === " ") {
        return [end, 1, text + c]
    } 
    if(["\n", "\r"].includes(c)) {
        return [end, 2, text + c]
    }
    if(c === "+") {
        return [end, 3, text + c]
    }
    if(c === "-") {
        return [end, 4, text + c]
    }
    if(c === '*') {
        return [end, 5, text + c]
    }
    if(c === '/') {
        return [end, 6, text + c]
    }
}

function end() {
    return end
}

function foundNumber(c, text) {
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c)) {
        return [foundNumber, 0, text + c]
    } else {
        return [end, 0, text]
    }
}

// test
let test = '11 + 4 + 2 * 12 + 4 * 7'
console.log(test, test.length)
// for(let i = 0; i < test.length; i++) {
//     let obj = match(test, index)
//     i = index = obj.lastIndex
//     console.log(obj)
// }
// console.log(match(test, 0)) // 11
// console.log(match(test, 2)) // ' ' 
// console.log(match(test, 3)) // +
// console.log(match(test, 4)) // ' '
// console.log(match(test, 5)) // 4
// console.log(match(test, 6)) // ' '
// console.log(match(test, 7)) // +
// console.log(match(test, 8)) // ' '
// console.log(match(test, 9)) // 2 
// console.log(match(test, 10)) // ' '
// console.log(match(test, 11)) // *
// console.log(match(test, 12)) // ' '
// console.log(match(test, 13)) // 12
// console.log(match(test, 15)) // ' '
// console.log(match(test, 16)) // + 
// console.log(match(test, 17)) // ' '
// console.log(match(test, 18)) // 4
// console.log(match(test, 19)) // ' '
// console.log(match(test, 20)) // * 
// console.log(match(test, 21)) // ' '
console.log(match(test, 22)) // 7
console.log(match(test, 23)) // 7