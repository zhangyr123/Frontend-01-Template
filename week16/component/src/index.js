require('./foo.js')

function createElement(Cls, attributes, ...children) {
    console.log('CHILDREN: ', children)
    let o;

    if(typeof Cls === "string") { // 处理小写的标签
        o = new Wrapper(Cls)
    } else {
        o = new Cls({
            timer: {}
        });
    } 

    for(let name in attributes) {
        // o[name] = attritubes[name]
        o.setAttribute(name, attributes[name])
    }

    console.log("createElement: ", o)

    // console.log(children)
    for(let child of children) {
        // o.children.push(child)
        if(typeof child === 'string') {
            child = new Text(child)
        }
        console.log(child)
        debugger
        o.appendChild(child)
    }

    return o;
}

class Wrapper {
    constructor(type) {
        this.children = []
        this.root = document.createElement(type)
    }

    set class(v) { // property
        console.log("Parent::class", v)
    }

    setAttribute(name, value) { // attributes
        this.root.setAttribute(name, value)
    }

    appendChild(child) { // children
        console.log("parent::appendChild", child)
        // child.mountTo(this.root)
        this.children.push(child)
    }

    mountTo(parent) {
        console.log('child!!!')
        parent.appendChild(this.root)
        // this.children = [] //延迟作用
        for (let child of this.children) {
            child.mountTo(this.root)
        }
    }
}

class MyComponent {
    constructor(type) {
        this.children = []
        this.root = document.createElement("div")
        this.attributes = new Map()
    }

    // set class(v) { // property
    //     console.log("Parent::class", v)
    // }

    setAttribute(name, value) { // attributes
        this.attributes.set(name, value)
        this.root.setAttribute(name, value)
    }

    appendChild(child) { // children
        console.log("parent::appendChild", child)
        // child.mountTo(this.root)
        this.children.push(child)
    }

    render() {
        return <article>
            <h1>{this.attributes.get("title")}</h1>
            <header>I'm a header</header>
            {this.slot}
            <footer>I'm a footer</footer>
        </article>
    }

    mountTo(parent) {
        console.log('child!!!')
        // parent.appendChild(this.root)
        this.slot = <div></div>
        // this.children = [] //延迟作用
        for(let child of this.children) {
            this.slot.appendChild(child)
            // child.mountTo(this.root)
        }
        this.render().mountTo(parent)
    }
}

class Text{
    constructor(text) {
        this.children = []
        this.root = document.createTextNode(text)
    }

    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

// let component = <Div id="a" class="b" style="width:100px;height:100px;background-color:lightgreen;">
//         <p></p>
//         <div></div>
//         <div></div>
//     </Div>

let component = <MyComponent title="I'm the title">
        <div style="color:red;">text text text</div>
    </MyComponent>

component.class = "c"

console.log(component)

component.mountTo(document.body)