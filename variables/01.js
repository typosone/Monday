/**
 */
$(function () {
    $("#exec").on("click", function () {
        var text = $("#userText").val();

        $("#output").text(text);
    })
});