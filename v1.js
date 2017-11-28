// desc: 「决战！平安京」首测版邀请激活码碰撞脚本（请使用「Auto.js」执行）
// author: bysyk
// date: 2017/11/23

"auto";

var N = 100; // 碰撞次数

var version = dialogs.singleChoice("请选择版本", ["官方版/网易版", "九游版", "手动启动"], 0);
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

toast("4秒后开始，请做好准备");
sleep(4000);
if (!confirm("是否开始碰撞" + N + "次激活码？")) {
  toast("已中断执行");
  exit();
}

// 在以上暂停的时间段请手动打开输入激活码的对话框
for(var i = 1; i <= N; ++i) {
  var c = code();
  log(i + ": " + code);
  toast("第 " + i + " 次碰撞，还剩 " + (N - i) + " 次...");
  Tap(1283, 542); // 点按「重置」按钮清空输入框
  sleep(200);
  Tap(877, 542); // 点按输入框进行输入
  sleep(300);
  Text(c); // 输入伪码
  sleep(400);
  Tap(1552, 73); // 点按「确定」按钮结束输入（坐标因设备而异）
  sleep(300);
  Tap(1203, 709); // 点按「确认」按钮等待结果（坐标因设备而异）
  sleep(1400);
}

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
