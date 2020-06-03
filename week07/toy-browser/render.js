const images = require('images')

function render(viewport, element) {
    let el = element
    if(element.style) {
        // console.log('element: ', element.style)
        // console.log('image width and height: ', element.style.width, element.style.height)
        var img = images(element.style.width, element.style.height)
        // console.log(img, element.style)

        if(element.style["background"]) {
            let color = element.style["background"] || "rgb(0,0,0)"
            color.replace(/\s+/g, '').match(/rgb\((\d+),(\d+),(\d+)\)/)
            // console.log('after color: ', color)
            // console.log('images color: ', Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3), 1)
            img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3), 1)
            // console.log(img, element.style.left || 0, element.style.top || 0)
            viewport.draw(img, element.style.left || 0, element.style.top || 0)
        }
    }
    // console.log('--------------------')

    if(element.children) {
        for(var child of element.children) {
            let t = child
            render(viewport, child)
        }
    }    
}

module.exports = render