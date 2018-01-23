$(function() {
    $.post("/user/showMenu", function(menu) {
        if (menu != 1) {
            var result = '<div class="easyui-accordion" style="height:100%;">';
            for (var i = 0, n = menu.length; i < n; i++) {
                result += '<div title="' + menu[i].name + '">';
                result += '<ul class="s-menu">';
                for (var j = 0, m = menu[i].children.length; j < m; j++) {
                    result += "<li onclick='addTab(\"" + menu[i].children[j].name + "\",\"" + menu[i].children[j].url + "\")'>" + menu[i].children[j].name + "</li>";
                }
                result += '</ul>';
                result += '</div>';
            }
            result += '</div>';
            $("#menu").html(result);
        }
        $.parser.parse($('#menu'));
    });

    $("#editMe").click(function() {
        alert("这里用于修改个人信息，包括修改密码");
    });

});

function addTab(title, url) {
    if (url == '') {
        return;
    }
    if ($("#tt").tabs('exists', title)) {
        $("#tt").tabs('select', title);
    } else {
        $("#tt").tabs('add', {
            title: title,
            closable: true,
            href: url
        });
    }
}