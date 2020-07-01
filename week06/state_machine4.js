// 状态机匹配任意pattern
function match(string, pattern) {
    let state = start
    let index = 0
    for(let c of string) {
        let _state = state(c, pattern, index)
        state = _state[0]
        index = _state[1]
    }
    return state == end
}

function start(c, pattern, index) {
    if(c === pattern[index]) {
        return [process, 1]
    } else {
        return [start, 0]
    }
}

function end() {
    return [end, 0]
}

function process(c, pattern, index) {
    if(c === pattern[index]) {
        if(pattern.length == index + 1)
            return [end, 0]
        else return [process, index + 1]
    } else {
        if(pattern[0] === c) {
            return [process, 1]
        }
        return [start, 0]
    }
}

console.log(match('aabaecabd', 'abc'))