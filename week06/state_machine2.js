//'abcabx'
function match(string) {
    let state = start
    for(let c of string) {
        state = state(c)
    }
    return state === end
}

function start(c) {
    console.log("start: ", c)
    if(c === "a") {
        return foundA
    } else {
        return start
    }
}

function end(c) {
    console.log("end: ", c)
    return end
}

function foundA(c) {
    console.log("foundA: ", c)
    if(c === "b") {
        return foundB
    } else {
        return start
    }
}

function foundB(c) {
    console.log("foundB: ", c)
    if(c === "c") {
        return foundC
    } else {
        return start
    }
}

function foundC(c) {
    console.log("foundC: ", c)
    if(c === "a") {
        return foundA2
    } else {
        return start
    }
}

function foundA2(c) {
    console.log("foundA2: ", c)
    if(c === "b") {
        return foundB2
    } else {
        return start
    }
}

function foundB2(c) {
    console.log("foundB2: ", c)
    if(c === "x") {
        return end
    } else if(c === "c") {
        return foundC
    } else {
        return start
    }
}