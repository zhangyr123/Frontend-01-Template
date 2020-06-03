# layout
### flex(弹性布局)
1. 基本概念:
(1) 水平主轴:main axis;垂直交叉轴:cross axis;
(2) 主轴开始的位置(与边框的交叉点):main start;主轴结束的位置:main end;交叉轴的开始位置:cross start;交叉轴的结束位置:cross end;
(3)单个项目占据的主轴空间:main size;单个项目占据的交叉轴空间:cross size
2. 容器的属性
(1) flex-direction: row | row-reverse | column | column-reverse(决定主轴的方向,即项目的排列方向)
(2) flex-wrap: nowrap | wrap | wrap-reverse(换行后上下两行调换)
(3) flex-flow: `<flex-direction> || <flex-wrap> `(flex-direction 和 flex-wrap属性的简写形式)
(4) justify-content: flex-start | flex-end | center | space-between | space-around(项目在主轴上的对齐方式)
(5) align-items: flex-start | flex-end | center | baseline | strectch(单根轴线项目在交叉轴上的对齐方式)
(6) align-content: flex-start | flex-end | center | space-between | space-around | stretch(多根轴线的对齐方式.如果项目只有一根轴线,则该属性不起作用)
3. 项目的属性
(1)order: `<integer>`(定义了项目的排列顺序.是指越小,排列越靠前,默认为0)
(2)flex-grow: `<number>`(定义了项目的放大比例,默认为0)
(3)flex-shrink: `<number>`(定义了项目的缩小比例,默认为1)
(4)flex-basis: `<length>` | auto(定义了在分配多余空间之前,项目占据的主轴空间(main size). 浏览器根据这个属性,计算主轴是否有多余空间)
(5)flex: none | auto | [`<flex-grow> <flex-shrink> <flex-basis>`] （flex-grow、flex-shrink、flex-basis的简写，auto：1 1 auto； none： 0 0 auto；推荐使用）
(6) align-item：auto | flex-start | flex-end | center | baseline | stretch（允许单个项目与其他项目不一样的对齐方式，默认auto，即继承父元素）
### 收集元素到行内（分行）
1. 根据主轴尺寸，把元素分入行
2. 若设置了no-wrap，则强行分配进第一行
### 计算主轴方向
1. 计算主轴方向，找出所有flex元素
2. 把主轴方向的剩余尺寸按比例分配给这些元素
3. 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素
### 计算交叉轴方向
1. 根据每一行最大元素尺寸计算行高
2. 根据行高flex-align 和 item-align，确定元素具体位置
# CSS
### CSS语法
[参考链接1](https://www.w3.org/TR/CSS21/grammar.html#q25.0)<br>
[参考链接2](https://www.w3.org/TR/css-syntax-3)<br>

*结构*
1. @charset
2. @import
3. rules<br>
1)@media<br>
2)@page<br>
3)rule<br>
### CSS语法规则
[@charset](https://www.w3.org/TR/css-syntax-3/)<br>
[@import](https://www.w3.org/TR/css-cascade-4/)<br>
[@media](https://www.w3.org/TR/css3-conditional/)<br>
[@page](https://www.w3.org/TR/css-page-3/)<br>
[@counter-style](https://www.w3.org/TR/css-counter-styles-3)<br>
[@keyframes](https://www.w3.org/TR/css-animations-1/)<br>
[@fontface](https://www.w3.org/TR/css-fonts-3/)<br>
[@supports](https://www.w3.org/TR/css3-conditional/)<br>
[@namespace](https://www.w3.org/TR/css-namespaces-3/)<br>
### CSS语法规则结构
1. selector
[链接1](https://www.w3.org/TR/selectors-3/)<br>
[链接2](https://www.w3.org/TR/selectors-4/)
2. key
[链接1](https://www.w3.org/TR/css-variables/)
3. value
[链接](https://www.w3.org/TR/css-values-4/)