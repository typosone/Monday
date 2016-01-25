$(function () {
    if (!window.File || !window.FileReader
        || !window.FileList || !window.Blob) {
        return;
    }

    var cancelEvent = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };

    var dropFileEvent = function (event) {
        cancelEvent(event);

        var files = event.originalEvent.dataTransfer.files;

        for (var i = 0; i < files.length; i++) {
            var f = files[i];

            var reader = new FileReader();

            reader.onload = function (e) {
                var text = e.target.result;

                var img = $("<img>");
                img.attr("src", text);

                $("#output").append(img);
            };

            reader.readAsDataURL(f);
        }
    };

    $("#drop").on({
        "dragenter": cancelEvent
        , "dragover": cancelEvent
        , "dragleave": cancelEvent
        , "drop": dropFileEvent
    });
});