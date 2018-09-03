export default {
    install(Vue, options) {
        //列表定时push方法，配合animate.css实现列表的动态插入效果
        Vue.prototype.animateList = function(data, vm, time) {
            time = time || 100
            let i = 0;
            let target = data.length;
            (function add() {
                if (i === target) return;
                vm.push(data[i]);
                i++;
                setTimeout(add, time);
            })();
        };

        Vue.prototype.debounce = function(action, idle) {
            var last
            return function() {
                var ctx = this,
                    args = arguments
                clearTimeout(last)
                last = setTimeout(function() {
                    action.apply(ctx, args)
                }, idle)
            }
        };

        Vue.prototype.throttle = function(fn, threshhold, scope) {
            threshhold || (threshhold = 250);
            let last,
                timer;
            return function() {
                let context = scope || this;

                let now = +new Date(),
                    args = arguments;
                if (last && now - last + threshhold < 0) {
                    // hold on to it
                    clearTimeout(deferTimer);
                    timer = setTimeout(function() {
                        last = now;
                        fn.apply(context, args);
                    }, threshhold);
                } else {
                    last = now;
                    fn.apply(context, args);
                }
            };
        };
    }
}
export const MathRand = () => {
    let Num = "";
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num
}

// 生成uuId
export const getuuId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}