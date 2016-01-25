$(function () {
    var count = 0;

    var messages = [
        "(1)「技評タブレット」の特徴を紹介します。"
        , "(2) 本商品は弊社コンテンツ閲覧専用のタブレットです。"
        , "(3) 過去の書籍をすべて読めます。"
        , "(4) また、今後発売する書籍も安価で閲覧可能です。"
        , 4
        , true
        , function() {return "hoge";}
        , [0, 2, 4]
    ];

    $("#execButton").on("click", function () {
        var text = messages[count];
        $("#output").val(text);

        count++;

        if (count >= messages.length) {
            count = 0;
        }
    });
});