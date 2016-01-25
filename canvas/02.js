$(function () {
    $(".dummy").each(function () {
        var text = $(this).text();
        var params = text.split("x");
        var w = params[0];
        var h = params[1];

        try {
            var canvas = $("<canvas>")
                .attr("width", w)
                .attr("height", h)
                .get(0);
            var context = canvas.getContext("2d");
        } catch (e) {
            console.log(e);
            return;
        }

        // 背景の作成
        context.fillStyle = "#aaa";
        context.fillRect(0, 0, w, h);

        // 模様の設定
        context.strokeStyle = "#333";
        context.lineWidth = 1;

        // 描画の最大半径
        var max = Math.sqrt(w * w + h * h) / 2;

        // 円を順番に描画
        for (var r = 0; r < max; r += 5) {
            context.beginPath();
            context.arc(w / 2, h / 2, r, 0, Math.PI * 2, false);
            context.stroke();
            // 弧
        }

        // 文字を
        context.font = Math.floor(h * 0.6) + "px 'Times New Roman'";

        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#fff";

        context.fillText(text, w / 2, h / 2, w * 0.9);

        $(this).empty().append(canvas);
    });
});