const { start } = require("repl")
const { nextTick } = require("process")
const { PreviousMap } = require("postcss")
const { genericTypeAnnotation } = require("babel-types")

Carousel
   state
       activeIndex

   property
       loop time imglist autoplay color forward

   attribute
        startIndex loop time imglist autoplay color forward

   children
        // 2 种风格
        append remove add
   event
        change click hover swipe resize

   method
        next() prev() goto() play() stop()