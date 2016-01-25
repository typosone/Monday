$(function () {
    $("#execButton").on("click", function () {
        var check = $("#check").prop("checked");

        if (check) {
            $("#output").val(
                "ありがとうございます。サービスをご利用ください。"
            );
        } else {
            $("#output").val(
                "規約に同意しなければ、サービスは利用できません。"
            );
        }
    });
});