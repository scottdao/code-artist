$(function() {
    $("#submitForm").click(function() {
        var formArr = $("#loginForm").serializeArray();
        $.post("/toLogin", { username: formArr[0].value, password: formArr[1].value }, function(data) {
            if (data == HttpStatuCode.SUCCESS) {
                location = "main.html";
            } else {
                $("#message").html(data);
            }
        });
    });
});