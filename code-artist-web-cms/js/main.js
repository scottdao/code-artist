$(function() {
    $.post("/showMenu", function(menu) {
        if (menu != 1) {
            var result = '<ul>';
            for (var i = 0, n = menu.length; i < n; i++) {
                result += '<li class="p-menu">' + menu[i].name + '</li>';
                result += '<ul class="s-menu">';
                for (var j = 0, m = menu[i].children.length; j < m; j++) {
                    result += "<li onclick='addTab(\"" + menu[i].children[j].name + "\",\"" + menu[i].children[j].url + "\")'>" + menu[i].children[j].name + "</li>";
                }
                result += '</ul>';
            }
            result += '</ul>';
            $("#menu").html(result);
            $(".s-menu").hide();
            $(".p-menu").click(function() {
                $(this).next().slideToggle();
            });
        }
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