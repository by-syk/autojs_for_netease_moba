// desc: 「决战！平安京」首测版邀请激活码碰撞脚本（请使用「Auto.js」执行）
// author: bysyk
// date: 2017/11/25

"auto";

var N = 20; // 时间欺骗次数
var TIME_GO = 10010000; // 10/01 00:00 -> 12/31 23:00

var version = dialogs.singleChoice("请选择版本",
  ["官方版/网易版", "九游版", "手动启动"], 0);
if (version == 0) {
  launchPackage("com.netease.moba");
} else if (version == 1) {
  launchPackage("com.netease.moba.aligames");
} else if (version == 2) {
  // do nothing
} else {
  toast("已中断执行");
  exit();
}

toast("3秒后开始，请做好准备");
sleep(3000);
if (!confirm("是否开始碰撞激活码？")) {
  toast("已中断执行");
  exit();
}

for (var n = 1; n <= N; ++n) {
  toast("第 " + n + " 次时间欺骗");
  timego();  
  sleep(400);
  Tap(998, 667); // 重新连接
  sleep(2400);
  Tap(970, 909); // 关闭公告
  sleep(300);
  Tap(1660, 825); // 打开对话框
  sleep(2000);
  for(var i = 1; i <= 5; ++i) {
    var c = code();
    log(i + ": " + code);
    toast("第 " + i + " 次碰撞...");
    Tap(1283, 542); // 点按「重置」按钮清空输入框
    sleep(200);
    Tap(877, 542); // 点按输入框进行输入
    sleep(400);
    Text(c); // 输入伪码
    sleep(400);
    Tap(1552, 73); // 点按「确定」按钮结束输入（坐标因设备而异）
    sleep(300);
    Tap(1203, 709); // 点按「确认」按钮等待结果（坐标因设备而异）
    sleep(1600);
  }
  toast("等待下一轮：" + TIME_GO);
  sleep(5000);
}
toast("已中断执行");

// 生成「决战！平安京」伪激活码
function code(pre) {
  // 开头俩无重字母
  var code = pre;
  if (!code) {
    code = String.fromCharCode(random(65, 90));
    var next;
    do {
      next = String.fromCharCode(random(65, 90));
    } while (code.indexOf(next) >= 0);
    code += next;
  }
  // 加6除零无重数字
  for (var i = 0; i < 6; ++i) {
    var next;
    do {
      next = random(1, 9);
    } while (code.indexOf(next) >= 0);
    code += next;
  }
  return code;
}

// 延后1小时（其实30分钟，1小时是为了方便计算）
function timego() {
  shell("date " + TIME_GO + " set", true);
  TIME_GO = parseInt(TIME_GO / 10) * 10;
  if (TIME_GO % 10000 >= 2300) {
    TIME_GO += 7700;
  } else {
    TIME_GO += 100;
  }
}
