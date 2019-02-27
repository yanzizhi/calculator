// pages/calculator/calculator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id1: 'clear',
    id2: 'back',
    id3: 'history',
    id4: 'div',
    id5: 'num_7',
    id6: 'num_8',
    id7: 'num_9',
    id8: 'mul',
    id9: 'num_4',
    id10: 'num_5',
    id11: 'num_6',
    id12: 'sub',
    id13: 'num_1',
    id14: 'num_2',
    id15: 'num_3',
    id16: 'add',
    id17: 'num0',
    id18: 'dot',
    id19: 'equal',

    result: '0',
    dotSign: false,
  },

  clickButton: function(e) {
    console.log(e);
    let btnValue = e.target.id;  //获取按钮的值
    let res = this.data.result;
    let newDotSign = this.data.dotSign;
    console.log(btnValue);
    //判断点击的是否为数字，如果是就将其拆分
    if(btnValue>="num_0" && btnValue<="num_9") {  
      console.log(btnValue.split('_'));
      let num = btnValue.split('_')[1];  //获取数字
      if(res == '0') {
        res = num;
      } else {
        res += num;
      }
    } else {
      //如果是小数点
      if(btnValue == 'dot') {
        //先判断当前有没有小数点，没有的话就添加一个小数点，并将小数点标记设置为true
        if(!newDotSign) {
          res += '.';
          newDotSign = true;
        }
      } else if(btnValue == 'clear') {
        //如果按钮为清除，就将结果设置为0，并将小数点标记设置为false
        res = '0';
        newDotSign = false;
      } else if(btnValue == 'back') {
        //如果是回退，先获取结果的字符串长度
        let length = res.length;
        //如果字符串长度大于1，接抽取字符串0到倒数第二个的字符，相当于把最后一个字符减去
        if(length>1) {
          res = res.substr(0, length-1);
        } else {
          //如果字符串长度为1，则直接将其设置为0
          res = '0';
        }
      } else if(btnValue=='add' || btnValue=='sub' || btnValue=='mul' || btnValue=='div') {
        newDotSign = false;
        let sign;
        switch(btnValue) {
          case 'add':
            sign = '+';
            break;
          case 'sub':
            sign = '-';
            break;
          case 'mul':
            sign = '*';
            break;
          case 'div':
            sign = '/';
            break;
        }
        if(!isNaN(res.charAt(res.length-1))) {
          //如果结果最后是数字，则加上运算符
          res += sign;
        }
      }
    }


    console.log('-----' + newDotSign);
    this.setData({
      result: res,
      dotSign: newDotSign,
    })
  },

  equal: function() {
    let str = this.data.result;
    let strArr = [];
    let item = '';
    let temp = 0;
    for(let i=0; i<= str.length; i++) {
      let ch = str.charAt(i);
      console.log('=====' + ch);
      if((ch!='' && ch>=0 && ch<=9) || ch=='.') {
        item = item + ch;
      }else {
        strArr[temp] = item;
        temp++;
        strArr[temp] = ch;
        temp++;
        item = '';
      }
    }

    console.log('未去除' + strArr);
    //如果数组最后一项不为数字，则将其删除
    if (isNaN(strArr[strArr.length - 1]) || strArr[strArr.length - 1] == '') {
      strArr.pop();
    }
    console.log('去除1:' + strArr);

    if (isNaN(strArr[strArr.length - 1]) || strArr[strArr.length - 1] == '') {
      console.log(typeof (strArr[strArr.length - 1]));
      strArr.pop();
    }
    console.log('去除2:' + strArr);

    for(let i=0; i<strArr.length; i++) {
      console.log(strArr[i]);
    }

    let res = strArr[0]*1;
    let num;
    for(let i=1; i<strArr.length; i=i+2) {
      num = strArr[i+1]*1;
      switch(strArr[i]) {
        case '+':
          res = res+num;
          break;
        case '-':
          res = res-num;
          break;
        case '*':
          res = res*num;
          break;
        case '/':
          if(num != 0) {
            res = res/num;
          } else {
            res = '0'
          }
          break;
      }
    }

    this.setData({
      result: '=' + res
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})