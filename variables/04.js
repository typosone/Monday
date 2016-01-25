$(function(){
    $("#calcButton").on("click", function() {
        var year = $("#year").val();

        var num = (year - 1900) % 12;

        $("#orientalZodiac").val(num);
    })
});