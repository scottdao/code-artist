$(function() {
    $.post("/showLogin", function(user) {
        $("#admin").html(user.realname);
    });

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
        easyuiConfig.newDialog("editDialog", '修改个人信息', 280, 260, "/system/edit.html", function() {
            $("#editForm").form('enableValidation');
            if ($("#editForm").form('validate')) {
                $.post("/toEdit", $("#editForm").serialize(), function(data) {
                    if (data == "100") {
                        $.messager.alert('系统提示', '原始密码密码错误！');
                    } else if (data == "200") {
                        location = "/exit";
                    } else if (data != '') {
                        $.messager.alert('系统提示', '管理员' + data + '保存成功！');
                        $("#editDialog").dialog('close');
                        $("#adminDatagrid").datagrid('reload');
                    } else {
                        $.messager.alert('系统提示', '管理员保存失败！');
                        $("#editDialog").dialog('close');
                    }
                });
            }
        });
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