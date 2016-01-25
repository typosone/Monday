$(function () {
    $("#getButton").on("click",
        function () {
        var text = $("#view").html();
        $("#userText").val(text);
    });

    $("#backButton").on("click", function () {
        var text = $("#userText").val();
        $("#view").html(text);
    });
});