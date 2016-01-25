$(function () {
    $('#execButton').on("click", function () {
        var num = $("#userNum").val();

        var calc1 = num * 100;
        var calc2 = num % 100;

        $("#calc1").text(calc1);
        $("#calc2").text(calc2);
    })
});