$(function () {
    var canvas = $("#myCanvas").get(0);
    if (!canvas || !canvas.getContext) {
        return;
    }

    var w = canvas.width;
    var h = canvas.height;

    // 2Dコンテクストを取得
    var context = canvas.getContext("2d");

    // 背景を塗りつぶし
    context.fillStyle = "#ffffcc";
    context.fillRect(0, 0, w, h);

    // 枠を描画
    context.strokeStyle = "#eeaa66";
    context.lineWidth = 10;
    context.strokeRect(0, 0, w, h);

    // 文字を描画するのに必要な共通設定
    var text = "HTML5 + JavaScript !";
    context.font = "64px 'Times New Roman'";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.lineJoin = "round";

    // 文字周辺枠
    context.strokeStyle = "#aa6633";
    context.lineWidth = 10;
    context.strokeText(text, w / 2, h / 2);


    // エンボス光
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
    context.strokeText(text, w / 2 - 1, h / 2 - 1);

    // エンボス影
    context.strokeStyle = "#884422";
    context.strokeText(text, w / 2 + 1, h / 2 + 1);

    // 文字本体
    context.fillStyle = "#dd9955";
    context.fillText(text, w / 2, h / 2);
});