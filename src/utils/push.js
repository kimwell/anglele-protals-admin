import * as types from '@/store/types'
import {
  MathRand
} from '@/utils/tools.js'
export default {
  data() {
    return {
      isFocus: true,
      titleInit: document.title,
      stl: '',
      msg: '默认通知',
      isNotice: true
    }
  },
  methods: {
    initScoket() {
      let _this = this;
      let rand = this.$ls.get('rand');
      if (rand == null) {
        rand = MathRand();
        this.$ls.set('rand', rand);
      }
      // 建立WebSocket链接
      let ws = new WebSocket(this.api.ws + "/ironHander?userId=" + this.$store.state.loginId + rand);

      ws.onopen = function (evt) {
        //  console.log("消息推送链接成功");
      };

      ws.onmessage = function (evt) {
        let data = JSON.parse(evt.data);
        _this.isNotice = false;
        _this.msg = data;
        _this.notify(data);
      };

      ws.onclose = function (evt) {
        setTimeout(() => {
          _this.initScoket();
        }, 10000)
      };

      if (window.Notification)
        Notification.requestPermission();
    },
    notify(data) {
      let _this = this;
      let title = data.title;
      let body = data.body;
      let icon = `https://tbxoss.oss-cn-hangzhou.aliyuncs.com/ggh/push_icons/bg${data.code}.png`;
      if (window.Notification && Notification.permission == 'granted') {
        let notif = new Notification(title, {
          body: body, //通知的具体内容
          icon: icon,
          requireInteraction: true
        });
        notif.onclick = () => {
          if (data.code == 1 || data.code == 5) {
            this.$router.push('/ironBuys');
          } else if(data.code == 2){
            this.$router.push('/dispatch');
          }else if(data.code == 6 || data.code == 7 || data.code == 9){
            this.$router.push('/order');
          }else if(data.code == 10){
            this.$router.push('/user/examine');
          }
          window.focus();
          notif.close();
        }
        this.isNotice = true;
      } else {
        if (this.isFocus) {
          this.$Notice.success({
            title: title,
            desc: body
          });
          this.isNotice = true;
        } else {
          this.stl = setInterval(function () {
            let title = document.title;
            if (/新/.test(title) == false) {
              document.title = '【你有新消息】' + _this.titleInit;
            } else {
              document.title = '【　　　　　】' + _this.titleInit;
            }
          }, 500);
        }
      }
    }
  }
}
