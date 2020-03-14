/**提示：只支持比较简单，较小的动画，复杂点的效果很差，会卡顿。
 * 在本地可以跑,跨域问题没解决。
 * 谷歌浏览器不行的话换个浏览器！
 *
 * 字符串动画
 * 参数：div,width,height,src,callback
 *
 * div:要添加到的div，
 * width:宽
 * height:高
 * src:视频路径
 * callback:回调函数
 *
 * 方法：draw         绘制控件
 * toText
 * getGray
 * toString
 * bindEvent
 *
 * 日期：2017-06-11
* */

function StringAnime(div,width,height,src,callback){
    this.div = div;
    this.w = width;
    this.h = height;
    this.src = src;
    this.callback = callback;

    this.draw();
    this.bindEvent();
}
StringAnime.prototype.draw = function(){
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.btn = document.createElement('input');
    this.video = document.createElement('video');

    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.btn.type = 'button';
    this.btn.value = '播放';

    this.video.preload = "auto";
    this.video.volume = 0.3;
    this.video.setAttribute('x-webkit-airplay', true);
    this.video.setAttribute('webkit-playsinline', true);
    this.video.setAttribute('webkit-playsinline', 'webkit-playsinline');
    this.video.width = this.w;
    this.video.height = this.h;
    this.video.src = this.src;

    this.div.appendChild(this.canvas);
    this.div.appendChild(this.btn);
};

StringAnime.prototype.toText = function(g){
    if (g <= 30) {
        return '8';
    } else if (g > 30 && g <= 60) {
        return '&';
    } else if (g > 60 && g <= 120) {
        return '$';
    }  else if (g > 120 && g <= 150) {
        return '*';
    } else if (g > 150 && g <= 180) {
        return 'o';
    } else if (g > 180 && g <= 210) {
        return '!';
    } else if (g > 210 && g <= 240) {
        return ';';
    }  else {
        return '.';
    }
};
StringAnime.prototype.getGray = function(r,g,b){
    return 0.299 * r + 0.578 * g + 0.114 * b;
};
StringAnime.prototype.toString = function(){
    var imgData = this.ctx.getImageData(0, 0, this.w, this.h);
    var imgDataArr = imgData.data;
    var imgDataWidth = imgData.width;
    var imgDataHeight = imgData.height;
    var html = '';
    for(var h = 0; h < imgDataHeight; h += 6) {        //调小，可以通过修改 h+= 获得清晰的效果。电脑不好的要小心。
        var p = '<p>';
        for(var w = 0; w < imgDataWidth; w += 3) {      //调小，可以通过修改 w+= 获得清晰的效果。电脑不好的要小心。
            var index = (w + imgDataWidth * h) * 4;
            var r = imgDataArr[index];
            var g = imgDataArr[index + 1];
            var b = imgDataArr[index + 2];
            var gray = this.getGray(r, g, b);
            p += this.toText(gray);
        }
        p += '</p>';
        html += p;
    }
    return html;
};

StringAnime.prototype.bindEvent = function(){
    this.btn.onclick = function(){
        this.video.play();
    }.bind(this);
    var self = this;
    this.video.addEventListener('play', function() {
        var i = window.setInterval(function(){
            self.ctx.drawImage(self.video, 0, 0, self.w, self.h);
            var html = self.toString();
            self.callback(html);
        },20);
    },false);

};

/*
StringAnime.prototype.setPosition = function(x,y){
    this.div.width = x;
    this.div.height = y;
};
*/
