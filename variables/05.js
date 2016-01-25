$(function () {
    $("#check1").on("click", function () {
        var check1 = $(this).prop("checked");
        console.log(check1);

        $("#check2").prop("checked", check1);
    });

    $("input[name=radio1]").on("click", function () {
        var radio1 = $("input[name=radio1]:checked").val();
        console.log(radio1);

        $("input[name=radio2]").val([radio1]);
    });
});