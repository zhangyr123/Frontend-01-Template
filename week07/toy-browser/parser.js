const css = require('css')
const layout = require('./layout.js')

let currentToken = null
let currentAttribute = null

let stack = [{type: "document", children: []}]
let currentTextNode = null

// css part1:收集CSS规则
let rules = []
function addCSSRules(text) {
    var ast = css.parse(text)
    // console.log('ast: ', JSON.stringify(ast.stylesheet.rules))
    rules.push(...ast.stylesheet.rules)
}
// css part:元素与规则匹配
// problem：此处为啥匹配
function match(element, selector) {
    if(!selector || !element.attributes) {
        return false
    }

    if(selector.charAt(0) == "#") {
        var attr = element.attributes.filter(attr => attr.name === 'id')[0]
        // console.log('0: ', attr)
        if(attr && attr.value === selector.replace("#", '')) {
            return true
        }
    } else if(selector.charAt(0) == ".") {
        var attr = element.attributes.filter(attr => attr.name === 'class')[0]
        if(attr && attr.value === selector.replace(".", '')) {
            return true
        }
    } else {
        if(element.tagName === selector) {
            return true
        }
    }
}
// css part3:计算选择器的权值
/**
 * 
 * 权值说明：
 * 1.内联样式表权值1000
 * 2.id选择器为100
 * 3.class选择器为10
 * 4.标签选择器为1
 * 此处存放的位置也是按照这个顺序来的
 */
function specificity(selector) {
    var p = [0, 0, 0, 0]
    var selectorParts = selector.split(" ")
    for(var part of selectorParts) {
        if(part.charAt(0) == "#") {
            p[1] += 1
        } else if(part.charAt(0) == ".") {
            p[2] += 1
        } else {
            p[3] += 1
        }
    }
    return p
}
function compare(sp1, sp2) {
    if(sp1[0] - sp2[0]) {
        return sp1[0] - sp2[0]
    }
    if(sp1[1] - sp2[1]) {
        return sp1[1] - sp2[1]
    }
    if(sp1[2] - sp2[2]) {
        return sp1[2] - sp2[2]
    }
    return sp1[3] - sp2[3]
}
// css part2:将收集的规则应用到元素上
function computeCSS(element) {
    // console.log('element: ', JSON.stringify(element))
    var elements = stack.slice().reverse() //slice()是为了不污染stack，reverse()是倒序，因为调用时应先获取当前元素，所以时由内向外的顺序，而获取的数组顺序是由外向内
    // console.log('elements: ',elements)

    if(!element.computedStyle) {
        element.computedStyle = {}
    }

    for(let rule of rules) {
        var selectorParts = rule.selectors[0].split(" ").reverse()

        // 规则在获取元素之前完成，此处依据获取到的当前的元素，再依次遍历规则，判断该条规则选择器的最后一级与元素是否匹配；若不匹配，则当前步骤退出，继续下一次遍历；若匹配，则继续
        if(!match(element, selectorParts[0])) {
            continue
        }

        // console.log('ok')
        var j = 1
        for(var i = 0; i < elements.length; i++) {
            // console.log("elements[i]: ", elements[i])
            // console.log("selectorParts[j]: ", selectorParts[j])
            if(match(elements[i], selectorParts[j])) {
                j++
            }
        }
        // console.log(j)
        let matched
        if(j >= selectorParts.length) {
            matched = true
        }

        // 元素的父子包含关系与选择器顺序匹配，继续，给元素添加computedStyle属性，值如下所示：
        // { width: { value: '100px', specificity: [ 0, 1, 0, 2 ] },
        //   background: { value: '#ff5000', specificity: [ 0, 1, 0, 2 ] } }
        if(matched) {
            // console.log('matched!')
            var sp = specificity(rule.selectors[0])
            // console.log('sp: ', sp)
            var computedStyle = element.computedStyle
            // console.log('computedStyle: ', computedStyle)
            for(var declaration of rule.declarations) {
                // console.log('declaration.property: ', declaration.property)
                if(!computedStyle[declaration.property]) {
                    computedStyle[declaration.property] = {}
                }

                if(!computedStyle[declaration.property].specificity) {
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                } else if(compare(computedStyle[declaration.property].specificity, sp) < 0) {
                    for(var k = 0; k < 4; k++) {
                        computedStyle[declaration.property][declaration.value][k] += sp[k]
                    }
                }
            }
        }
        // console.log('after element: ', JSON.stringify(element))
    }
}

function emit(token) {
    // if(token.type != "text")
    //     console.log('token: ', token.tagName, token.type)
    
    let top = stack[stack.length - 1]
    
    if(token.type == "startTag") {
        // console.log('tagName: ', token.tagName, 'startTag!!!')
        let element = {
            type: "element",
            children: [],
            attributes: []
        }

        element.tagName = token.tagName

        for(let p in token) {
            if(p != "type" && p != "tagName") {
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }

        // console.log('computeCSS: ')
        // 匹配元素和规则,给元素添加computedStyle属性
        computeCSS(element)
        // console.log('----------------------------------------------------------------------------')
        // console.log('yayaya: ', JSON.stringify(element))

        top.children.push(element)
        element.parent = top

        if(!token.isSelfClosing) {
            stack.push(element)
        } else {
            layout(element)
            // console.log('top: ', element)
        }
        currentTextNode = null
        // console.log('startTag: ', stack[stack.length - 1])
    } else if(token.type == "endTag") {
        // console.log(top.tagName, token.tagName)
        // console.log('tagName: ', token.tagName, 'endTag')
        if(top.tagName != token.tagName) {
            throw new Error("Tag start end doesn't match!")
        } else {
            if(top.tagName === "style") {
                // console.log('tagName style!!!')
                addCSSRules(top.children[0].content)
                // console.log('rules: ', JSON.stringify(rules))
            }
            // console.log('top: ', top)
            layout(top)
            stack.pop()
        }
        currentTextNode = null
    } else if(token.type == "text") {
        if(currentTextNode == null) {
            currentTextNode = {
                type: "text",
                content: ""
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content
    }
    // console.log('-----------------------------------------')
}

const EOF = Symbol("EOF")
function data(c) { //状态初始
    // console.log('data: ', c)
    if(c == "<") {
        return tagOpen
    } else if(c == EOF) {
        emit({
            type:"EOF"
        })
        return 
    } else {
        emit({
            type: "text",
            content: c
        })
        return data
    }
}

function tagOpen(c) { // 开始标签
    // console.log('tagOpen: ', c)
    if(c == "/") {
        return endTagOpen
    } else if(c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "startTag",
            tagName: ""
        }
        return tagName(c)
    } else {
        emit({
            type: 'text',
            content: c
        })
        return 
    }
}

function tagName(c) { // 标签名字
    // console.log('tagName: ', c)
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if(c == '/') {
        return selfClosingStartTag
    } else if(c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c
        return tagName
    } else if(c == '>') {
        emit(currentToken)
        return data
    } else {
        currentToken.tagName += c
        return tagName
    }
}

function beforeAttributeName(c) { // 标签属性
    // console.log('beforeAttributeName: ', c)
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if(c == '>' || c == '/' || c == EOF) {
        return afterAttributeName(c)
    } else if(c == '=') {
        // return beforeAttributeName
    } else {
        // return beforeAttributeName
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c)
    }
}

function attributeName(c) {
    // console.log('attributeName: ', c)
    if(c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
        return afterAttributeName(c)
    } else if(c == '=') {
        return beforeAttributeValue
    } else if(c == '\u0000') {
        //
    } else if(c == "\"" || c == "'" || c == "<") {
        //
    } else {
        currentAttribute.name += c
        return attributeName
    }
}

function beforeAttributeValue(c) {
    // console.log('beforeAttributeValue: ', c)
    if(c.match(/^[\t\n\f ]/) || c == '/' || c== '>' || c == EOF) {
        return beforeAttributeValue
    } else if(c == '\"') {
        return doubleQuotedAttributeValue
    } else if(c == '\'') {
        return singleQuotedAttributeValue
    } else if(c == '>') {
        //
    } else {
        return UnquotedAttributeValue(c)
    }
}

function doubleQuotedAttributeValue(c) {
    // console.log('doubleQuotedAttributeValue: ', c)
    if(c == '\"') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if(c == '\u0000') {
        //
    } else if(c == EOF) {
        //
    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function singleQuotedAttributeValue(c) {
    // console.log('singleQuotedAttributeValue: ', c)
    if(c == '\'') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if(c == '\u0000') {
        //
    } else if(c == EOF) {
        //
    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function afterQuotedAttributeValue(c) {
    // console.log('afterQuotedAttributeValue: ', c)
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if(c == '/') {
        return selfClosingStartTag
    } else if(c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if(c == EOF) {
        //
    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function UnquotedAttributeValue(c) {
    // console.log('UnquotedAttributeValue: ', c)
    if(c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    } else if(c == '/') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfClosingStartTag
    } else if(c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if(c == '\u0000') {
        //
    } else if(c == '\"' || c == '' || c== '<' || c == '=' || c == '`') {
        //
    } else if(c == EOF) {
        //
    } else {
        currentAttribute.value += c
        return UnquotedAttributeValue
    }
}

function selfClosingStartTag(c) { // 自封闭标签
    // console.log('selfClosingStartTag：', c)
    if(c == '>') {
        currentToken.isSelfClosing = true
        emit(currentToken)
        return data
    } else if(c == 'EOF') {
        // return
    } else {
        return data
    }
}

function endTagOpen(c) {
    // console.log('endTagOpen: ', c)
    if(c.match(/^[a-zA-Z]$/)) {
        // console.log('endTagOpen tagName!!!')
        currentToken = {
            type: "endTag",
            tagName: ""
        }
        return tagName(c)
    } else if(c == '>') {
        //
    } else if(c == EOF) {
        //
    } else if(c == " ") {
        return endTagOpen
    } else {
        console.log('test')
    }
}

function afterAttributeName(c) {
    // console.log('afterAttributeName: ', c)
    if(c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName
    } else if(c == '/') {
        return selfClosingStartTag
    } else if(c == '=') {
        return beforeAttributeValue
    } else if(c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if(c == EOF) {
        //
    } else {
        currentToken[currentAttribute.name] = currentAttribute.value
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c)
    }
}

module.exports.parseHTML = function parseHTML(html) {
    console.log('html', html)
    let state = data
    for(let c of html) {
        state = state(c)
        // console.log('state: ', c)
    }
    state = state(EOF)
    // console.log('stack', stack[0])
    return stack[0]
}