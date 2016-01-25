$(function () {
    // table 配下にかけ算九九表をだす
    // <tr>
    // <td>1</td>
    // <td>2</td>
    //</tr>

    for (var i = 1; i <= 9; i++) {
        var row = $("<tr>");
        for (var j = 1; j <= 9; j++) {
            var cel = $("<td>").text(i * j);
            row.append(cel);
        }
        $("table#output").append(row);
    }
});