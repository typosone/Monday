$(function () {
    $("#execButton").on("click", function() {
        var password = $("#userText").val();
        var res = "";
        if (password == "password") {
            res = "危険なパスワードです";
        } else {
            res = "安全なパスワードです。";
        }

        $("#output").text(res);
    });
});