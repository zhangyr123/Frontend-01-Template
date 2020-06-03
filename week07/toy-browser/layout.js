function getStyle(element) {
    // console.log('element style: ', element.computedStyle)
    if(!element.style) {
        element.style = {}
    }

    for(let prop in element.computedStyle) {
        // console.log('prop: ', prop)
        var p = element.computedStyle.value
        element.style[prop] = element.computedStyle[prop].value

        // console.log('style: ', element.style[prop])
        if(element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }
        // 取整
        if(element.style[prop].toString().match(/^[0-9\.]+$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }
    }
    // console.log('last style: ', element.style)
    return element.style
}

function layout(element) {
    // console.log('layout: ', element)
    // console.log('tagName: ', element.tagName)
    // console.log('children: ', element.children)
    if(!element.computedStyle) {
        // console.log('noStyle----------------------------------')
        return
    }
        

    var elementStyle = getStyle(element)
    // console.log('elementStyle: ', elementStyle)

    // console.log(elementStyle.display)
    if(elementStyle.display !== 'flex') {
        // console.log('noFlex------------------------------------')
        return
    }

    // console.log('before: ', element)
    var items = element.children.filter(e => e.type === 'element')
    // console.log('after: ', items)

    items.sort(function(a, b) {
        // console.log('a.order: ', a.order)
        // console.log('b.order: ', b.order)
        return (a.order || 0) - (b.order || 0)
    })
    // console.log(items)
    var style = elementStyle;

    // 将宽和高改为默认值
    ['width', 'height'].forEach((size, index) => {
        if(style[size] === 'auto' || style[size] === '') {
            style[size] = null
        }
    });

    if(!style.flexDirection || style.flexDirection === 'auto') {
        style.flexDirection = 'row'
    }
    if(!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch'
    }
    if(!style.justifyContent || style.justifyContent === 'auto') {
        style.justifyContent = 'flex-start'
    }
    if(!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap'
    }
    if(!style.alignContent || style.alignContent === 'auto') {
        style.alignContent = 'stretch'
    }
    // console.log(style) // 外部容器的样式

    var mainSize, mainStart, mainEnd, mainSign, mainBase,
        crossSize, crossStart, crossEnd, crossSign, crossBase
    // 所有项目方向
    if(style.flexDirection === 'row') {
        mainSize = 'width'
        mainStart = 'left'
        mainEnd = 'right'
        mainSign = +1 //正号
        mainBase = 0

        crossSize = 'height'
        crossStart = 'top'
        crossEnd = 'bottom'
    }
    if(style.flexDirection === 'row-reverse') {
        mainSize = 'width'
        mainStart = 'right'
        mainEnd = 'left'
        mainSign = -1
        mainBase = style.width

        crossSize = 'height'
        crossStart = 'top'
        crossEnd = 'bottom'
    }
    if(style.flexDirection === 'column') {
        mainSize = 'height'
        mainStart = 'top'
        mainEnd = 'bottom'
        mainSign = +1
        mainBase = 0

        crossSize = 'width'
        crossStart = 'left'
        crossEnd = 'right'
    }
    if(style.flexDirection === 'column-reverse') {
        mainSize = 'height'
        mainStart = 'bottom'
        mainEnd = 'top'
        mainSign = -1
        mainBase = style.height

        crossSize = 'width'
        crossStart = 'left'
        crossEnd = 'right'
    }

    // 
    if(style.flexWrap === 'wrap-reserve') {
        var tmp = crossStart
        crossStart = crossEnd
        crossEnd = tmp
        crossSign = -1
    } else {
        crossBase = 0
        crossSign = 1
    }

    // console.log(elementStyle)
    var isAutoMainSize = false
    // console.log('style: ', style)
    if(!style[mainSize]) {
        elementStyle[mainSize] = 0
        for(var i = 0; i < items.length; i++) {
            var item = items[i]
            if(item[mainSize] !== null || item[mainSize] !== (void 0)) {
                elementStyle[mainSize] = elementStyle[mainSize] + item[mainSize] || 0
            }
        }
        isAutoMainSize = true
    }

    // 将项目加入行
    var flexLine = []
    var flexLines = [flexLine]

    var mainSpace = elementStyle[mainSize]
    // mainSpace指的是一行加入项目时，剩余的空间量
    // console.log('mainSpace: ', mainSpace)
    var crossSpace = 0

    for(var i = 0; i < items.length; i++) {
        var item = items[i]
        var itemStyle = getStyle(item)
        // console.log('item: ', itemStyle)

        if(itemStyle[mainSize] === null) {
            itemStyle[mainSize] = 0
        }

        if(itemStyle.flex) {
            // console.log('flex')
            flexLine.push(item)
        } else if(style.flexWrap === 'nowrap' && isAutoMainSize) {
            // console.log('nowrap')
            mainSpace -= itemStyle[mainSize]
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize])
            } 
            flexLine.push(item)
        } else {
            // console.log('wrap')
            if(itemStyle[mainSize] > style[mainSize]) {
                itemStyle[mainSize] = style[mainSize]
            }
            if(mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainSpace
                flexLine.crossSpace = crossSpace

                flexLine = []
                flexLines.push(flexLine)

                flexLine.push(item)
                
                mainSpace = style[mainSize]
                crossSpace = 0
            } else {
                // console.log('push item: ', item)
                flexLine.push(item)
            }
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize])
                // console.log('crossSpace: ', crossSpace)
            }
            mainSpace -= itemStyle[mainSize]
            // console.log('mainSpace: ', mainSpace)
        }
        // console.log(mainSpace)
    }
    // console.log(mainSpace)
    // console.log('items: ', items)
    // console.log(elementStyle)

    if(style.flexWrap === 'nowrap' || isAutoMainSize) {
        flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace
    } else {
        flexLine.crossSpace = crossSpace
    }

    if(mainSpace < 0) { // 没有剩余空间
        var tmp_mainSpace = mainSpace
        // console.log('xxxxx!!!', style[mainSize])
        var scale = style[mainSize] / (style[mainSize] - tmp_mainSpace)
        // console.log(scale)
        var currentMain = mainBase // currentMain指的是在images中上一次画图结束的位置

        for(var i = 0; i < items.length; i++) {
            var item = items[i]
            var itemStyle = getStyle(item)

            if(itemStyle.flex) {
                itemStyle[mainSize] = 0
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale

            itemStyle[mainStart] = currentMain
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
            currentMain = itemStyle[mainEnd]
            // console.log(itemStyle)
        }
    } else {
        flexLines.forEach(function (items) {
            // console.log('mianSpace: ', items.mainSpace)
            var mainSpace = items.mainSpace
            var flexTotal = 0 // 子项目是flex容器的个数
            for(var i = 0; i < items.length; i++) {
                var item = items[i]
                var itemStyle = getStyle(item)
                // console.log(itemStyle)

                if((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
                    flexTotal += itemStyle.flex
                    continue
                }
                // console.log(flexTotal)
            }

            if(flexTotal > 0) {
                var currentMain = mainBase
                for(var i = 0; i < items.length; i++) {
                    var item = items[i]
                    var itemStyle = getStyle(item)

                    if(itemStyle.flex) {
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex
                    }
                    itemStyle[mainStart] = currentMain
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
                    currentMain = itemStyle[mainEnd]
                }
            } else {
                // console.log(mainBase)
                if(style.justifyContent === 'flex-start') {
                    var currentMain = mainBase
                    var step = 0
                }
                if(style.justifyContent === 'flex-end') {
                    var currentMain = mainSpace * mainSign + mainBase
                    var step = 0
                }
                if(style.justifyContent === 'center') {
                    var currentMain = mainSpace * mainSign + mainBase
                    var step = 0
                }
                if(style.justifyContent === 'space-between') {
                    var step = mainSpace / (items.length - 1) * mainSign
                    var currentMain = mainBase
                }
                if(style.justifyContent === 'space-around') {
                    var step = mainSpace / items.length * mainSign
                    var currentMain = step / 2 + mainBase
                }
                for(var i = 0; i < items.length; i++) {
                    var item = items[i]
                    var itemStyle = getStyle(item)
                    // console.log(itemStyle)
                    // console.log(currentMain)
                    // console.log(mainSign)
                    // console.log(itemStyle)
                    itemStyle[mainStart] = currentMain
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
                    currentMain = itemStyle[mainEnd] + step
                    
                }
            }
        })
    }

    var crossSpace
    if(!style[crossSize]) {
        crossSpace = 0
        elementStyle[crossSize] = 0
        for(var i = 0; i < flexLines.length; i++) {
            elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace
        }
    } else {
        crossSpace = style[crossSize]
        for(var i = 0; i < flexLines.length; i++) {
            crossSpace -= flexLines[i].crossSpace
        }
    }

    if(style.flexWrap === 'wrap-reverse') {
        crossBase = style[crossSize]
    } else {
        crossBase = 0
    }
    var lineSize = style[crossSize] / flexLines.length

    var step;
    if(style.alignContent === 'flex-start') {
        crossBase += 0
        step = 0
    } 
    if(style.alignContent === 'flex-end') {
        crossBase += crossSign * crossSpace
        step = 0
    }
    if(style.alignContent === 'center') {
        crossBase += crossSign * crossSpace / 2
        step = 0
    }
    if(style.alignContent === 'space-between') {
        crossBase += 0
        step = crossSpace / (flexLines.length - 1)
    }
    if(style.alignContent === 'space-around') {
        step = crossSpace / (flexLines.length)
        crossBase += crossSign * step / 2
    }
    if(style.alignContent === 'stretch') {
        crossBase += 0
        step = 0
    }
    flexLines.forEach(function(items) {
        var lineCrossSize = style.alignContent === 'stretch' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace
        for(var i = 0; i < items.length; i++) {
            var item = items[i]
            var itemStyle = getStyle(item)

            var align = itemStyle.alignSelf || style.alignItems

            if(itemStyle[crossSize] === null) {
                itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0
            }
            if(align === 'flex-start') {
                itemStyle[crossStart] = crossBase
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize]
            }
            if(align === 'flex-end') {
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize]
            }
            if(align === 'center') {
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize]
            }
            if(align === 'stretch') {
                itemStyle[crossStart] = crossBase
                itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) ? itemStyle[crossSize] : lineCrossSize)
                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
            }
        }
        crossBase += crossSign * (lineCrossSize + step)
    })
    // console.log(items)
    // console.log('flex------------------------------------')
}

module.exports = layout