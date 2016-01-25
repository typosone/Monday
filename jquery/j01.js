/**
 * Created by tsuyoshi on 2015/11/02.
 */

console.log(
    $("#target").text()
);

$(".target").each(function () {
    console.log(
        $(this).text()
    );
});

console.log(
    $("div.target").text()
);

console.log(
    $("div span").text()
);