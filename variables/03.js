$(function() {
    $("#calcButton").on("click", function() {
        var itemValue = $("#item option:selected").val();
        var numValue = $("#num option:selected").val();

        $("#itemSel").text(itemValue);
        $("#numSel").text(numValue);

        var result = itemValue * numValue;
        result = Math.floor(result);

        $("#result").text(result);
    });

    $("#calcButton").click();
});