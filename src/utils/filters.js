import df from 'dateformat-util'

//接口类型转换图标
export const toIcon = value => {
    let icon = '';
    switch (value) {
        case 0:
            icon = "icon-weizhi";
            break;
        case 1:
            icon = "icon-chaxun";
            break;
        case 2:
            icon = "icon-zengjia";
            break;
        case 3:
            icon = "icon-gengxin";
            break;
        case 4:
            icon = "icon-shanchu";
            break;
        default:
            break;
    }
    return icon
}

// 求购状态
export const statusStr = (val) => {
    switch (val * 1) {
        case 1:
            return '进行中'
            break;
        case 2:
            return '已成交'
            break;
        case 3:
            return '已失效'
            break;
        default:
            return '失效'
            break;
    }
}

// 报价状态
export const offerStr = (val) => {
    switch (val * 1) {
        case 0:
            return '待报价'
            break;
        case 1:
            return '已报价'
            break;
        case 2:
            return '已成交'
            break;
        case 3:
            return '未中标'
            break;
        case 4:
            return '已忽略'
            break;
        default:
            return '失效'
            break;
    }
}

// 中标状态
export const isOfferStatus = (val) => {
    switch (val * 1) {
        case 2:
            return '中标'
            break;
        case 3:
            return '未中标'
            break;
        default:
            return '未知'
            break;
    }
}

// 发布平台
export const wherePublish = value => {
        switch (value * 1) {
            case 1:
                return 'PC'
                break;
            case 2:
                return 'H5'
                break;
            case 3:
                return 'ios'
                break;
            case 4:
                return 'android'
                break;
            default:
                return '全部'
                break;
        }
    }
    //  定开计划状态
export const dkStatus = (val) => {
        switch (val * 1) {
            case 0:
                return '用户下架'
                break;
            case 1:
                return '上架'
                break;
            case 2:
                return '超管下架'
                break;
            case 3:
                return '系统下架'
                break;
            case 7:
                return '超管删除'
                break;
            case 9:
                return '用户删除'
                break;
        }
    }
    // 是否含税
export const taxTypeStatus = (val) => {
        switch (val * 1) {
            case 1:
                return '含税'
                break;
            case 2:
                return '不含税'
                break;
        }
    }
    //  处理数据排序类型
export const sortType = (val) => {
    switch (val * 1) {
        case 1:
            return '品类'
            break;
        case 2:
            return '材质'
            break;
        case 3:
            return '表面'
            break;
        case 4:
            return '产地'
            break;
    }
}

//  处理资源类型
export const storeType = (val) => {
        switch (val * 1) {
            case 1:
                return '现货资源'
                break;
            case 2:
                return '定开计划'
                break;
            case 3:
                return '特价资源'
                break;
        }
    }
    //  处理资源类型
export const typeData = (val) => {
    switch (val * 1) {
        case 1:
            return '板卷'
            break;
        case 2:
            return '非板卷'
            break;
        case 3:
            return '其他'
            break;
    }
}

//  资源开放时间配置状态
export const nowStatus = (val) => {
        switch (val * 1) {
            case 1:
                return '开放中'
                break;
            case 0:
                return '已闭市'
                break;
            case 3:
                return '开放中'
                break;
            case 4:
                return '已闭市'
                break;
        }
    }
    // 常规休市日显示
export const dealRestDay = (val) => {
    let w = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const numberToWeek = (value) => {
        let str = value.toString();
        let len = value.toString().length;
        let C_Num = [];
        for (var i = 0; i < len; i++) {
            C_Num.push(w[str.charAt(i)]);
        }
        return C_Num.join('');
    }
    if (val != '') {
        return numberToWeek(val)
    } else {
        return '无'
    }
}

// 时间戳转时分秒
export const dataToTime = (val, fromatStr = 'yyyy-MM-dd hh:mm:ss') => {
    if (val != '') {
        let time = df.format(new Date(val), fromatStr)
        if (time != '' || time != NaN) {
            let t = time.split(' ');
            return t[1];
        }
    } else {
        return 0
    }
}


//  2位数不足10前面补0
export const addZero = (value) => {
    return value < 10 ? '0' + value : value
}

//  将毫秒转为天时分秒
/*
*params 1、 转为 天时分秒
*params 2、 转为 时分秒
*params 3、 转为 天-时:分:秒
params 转为 时:分:秒
*/
export const formatDuring = (mss, params) => {

    let days = parseInt(mss / (1000 * 60 * 60 * 24));
    let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = (mss % (1000 * 60)) / 1000;
    switch (params * 1) {
        case 1:
            return days + " 天 " + hours + " 小时 " + addZero(minutes) + " 分钟 " + addZero(seconds) + " 秒 ";
            break;
        case 2:
            return hours + " 小时 " + addZero(minutes) + " 分钟 " + addZero(seconds) + " 秒 ";
            break;
        case 3:
            return days + '-' + addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds);
            break;
        default:
            return addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds);
            break
    }
}


//  订单状态
export const orderStatus = (val) => {
        switch (val * 1) {
            case 1:
                return '已确认'
                break;
            case 2:
                return '待确认'
                break;
            case 3:
                return '卖家未接单'
                break;
            case 4:
                return '超时取消订单'
                break;
            case 5:
                return '买家取消订单'
                break;
            case 6:
                return '超管取消订单'
                break;
            case 9:
                return '超管删除订单'
                break;
        }
    }
    // 计量方式转义
export const measuringStr = (value) => {
        switch (value) {
            case 1:
                return '过磅'
                break;
            case 2:
                return '理计'
                break;
            default:
                break;
        }
    }
    // js时间转化为几天前,几小时前，几分钟前
export const getDateDiff = (value, now) => {
        let nowTime = now ? now : new Date().getTime();
        let result = '';
        let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let halfamonth = day * 15;
        let month = day * 30;
        let diffValue = nowTime - value;
        if (diffValue < 0) {
            return '刚刚';
        }
        let monthC = diffValue / month;
        let weekC = diffValue / (7 * day);
        let dayC = diffValue / day;
        let hourC = diffValue / hour;
        let minC = diffValue / minute;
        if (monthC >= 1) {
            result = "" + parseInt(monthC) + "月前";
        } else if (weekC >= 1) {
            result = "" + parseInt(weekC) + "周前";
        } else if (dayC >= 1) {
            result = "" + parseInt(dayC) + "天前";
        } else if (hourC >= 1) {
            result = "" + parseInt(hourC) + "小时前";
        } else if (minC >= 1) {
            result = "" + parseInt(minC) + "分钟前";
        } else
            result = "刚刚";
        return result;
    }
    // 为空处理
export const isEmpty = (value, params) => {
    if (value != '') {
        return value
    } else {
        return params ? params : '全部'
    }
}

//  时间戳转年月日时分
export const dateformat = (value, fromatStr = 'yyyy-MM-dd hh:mm') => {
    return df.format(new Date(value), fromatStr)
}

//  时间戳转年月日
export const dateformatZ = (value, fromatStr = 'yyyy-MM-dd') => {
        return df.format(new Date(value), fromatStr)
    }
    // 时间戳转年月日时分秒
export const dateformatS = (value, fromatStr = 'yyyy-MM-dd hh:mm:ss') => {
    return df.format(new Date(value), fromatStr)
}

// 时间戳转时分秒
export const dateformatT = (value, fromatStr = 'mm:ss') => {
    return df.format(new Date(value), fromatStr)
}

//  付款方式
export const payMent = (val) => {
        switch (val * 1) {
            case 1:
                return '电汇'
                break;
            case 2:
                return '支票'
                break;
            case 3:
                return '承兑'
                break;
        }
    }
    //   合同用户类型
export const userTypeStu = (val) => {
        switch (val * 1) {
            case 1:
                return '个人'
                break;
            case 2:
                return '企业'
                break;
            case 4:
                return '平台自身'
                break;
            default:
                return '-'
                break;
        }
    }
    //  合同证件类型
export const certifyTypeStu = (val) => {
    switch (val * 1) {
        case 1:
            return '身份证'
            break;
        case 2:
            return '护照'
            break;
        case 3:
            return '军官证'
            break;
        case 4:
            return '营业执照'
            break;
        case 5:
            return '组织机构代码证'
            break;
        case 6:
            return '社会统一信用代码'
        default:
            return '-'
            break;
    }
}

//  订单状态  
export const orderSta = (val) => {
        switch (val * 1) {
            case 0:
                return '实单求购'
                break;
            case 1:
                return '现货资源'
                break;
            case 2:
                return '定开计划'
                break;
            default:
                return '特价资源'
                break
        }
    }
    //  合同认证状态  
export const authStatus = (val) => {
    switch (val) {
        case '0':
            return '申请保存'
            break;
        case '1':
            return '认证成功'
            break;
        case '2':
            return '认证待审核'
            break;
        case '3':
            return '认证变更中'
            break;
        case '4':
            return '变更待审核'
            break;
        case '9':
            return '认证失败'
            break;
        case 'd':
            return '未认证'
            break;
        default:
            return '-'
            break
    }
}

//空值转换
export const emptyHlod = (value, payload = '—') => {
    if (value != '') {
        return value
    } else {
        return payload
    }
}

//多余部分省略号
export const intercept = (value, le = 30) => {
    return value.length <= le ? value : value.substring(0, le) + '...';
}