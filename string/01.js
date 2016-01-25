$(function () {
    $("#execButton").on("click", function () {
        var text = $("#userText").val();

        $("#output").text("文字列の長さは" + text.length + "です。");
    });
});