$(() => {
    $("#submitForm").click(() => {
        var username = $("[name='username']").val();
        var password = $("[name='password']").val();
        if (username == '') {
            $("#message").html("用户名不能为空");
            return;
        } else if (password == '') {
            $("#message").html("密码不能为空");
            return;
        }
        $.post("/toLogin", $("#loginForm").serialize(), data => {
            if (data == 0) {
                location = "/main.html";
            } else {
                $("#message").html(data);
            }
        });
    });
});