$(function () {
    $("#execButton").on("click", function(){
        var text = $("#userText").val();

        text = text.replace(/<.+?>/g, "");

        $("#output").val(text);
    });
});
