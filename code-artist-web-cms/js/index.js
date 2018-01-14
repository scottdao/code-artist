$(function() {
    $("#submitForm").click(function() {
        $.post("/toLogin", $("#loginForm").serialize(), function(data) {
            if (data == 0) {
                location = "main.html";
            } else {
                $("#message").html(data);
            }
        });
    });
});