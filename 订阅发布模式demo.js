//编写一个简单的发布订阅模式
//定义一个发布者，这里以淘宝店家为例子
let shopObj = {} //定义一个发布者，相当于卖家
shopObj.list = [] //定义一个缓存列表，用于存放订阅者的回调函数

//定义一个增加订阅者的方法
// shopObj.listen = fn => {
//     shopObj.list.push(fn)
// }
//定义一个增加订阅者的方法，用key来区分买家，每个买家可能有多个任务，所以是一个数组
shopObj.listen = function (key, fn) {
    !this.list[key] ? this.list[key] = [] : null
    this.list[key].push(fn)
    console.log(this.list)
}

//定义一个发布消息的方法
// shopObj.trigger = function () {
//     this.list.forEach(fn => {
//         fn.apply(this, arguments);
//     })
// }
//定义一个发布消息的方法,根据key来判断发送的消息
shopObj.trigger = function () {
    let key = Array.prototype.shift.call(arguments)
    let fns = this.list[key]
    if (!fns || fns.length === 0) return
    fns.forEach(fn => {
        fn.apply(this,arguments)
    })
}

//定义一个取消订阅的的方法
shopObj.remove = function(key,fn)  {
    let fns = this.list[key]
    if(!fns) return false
    if(!fn) {
        this.list[key] = []
        console.log('清除所有指定key的订阅')
    } else {
        for(let i = 0;i < fns.length;i++){
            fn === fns[i]? fns.splice(i,1) : null
        }
    }
}

//张三订阅的消息，相当于买家
shopObj.listen('电脑', item => {
    console.log('购买的是' + item)
})

//李四订阅的消息，相当于买家
shopObj.listen('显卡', item => {
    console.log('再次购买的是' + item)
})

shopObj.trigger('电脑', 'macbook')
shopObj.remove('red')
shopObj.trigger('电脑', 'macbook')
shopObj.trigger('显卡', 'gtx2080')
