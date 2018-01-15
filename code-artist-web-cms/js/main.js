$(function() {
    $.post("/showMenu", function(menu) {
        if (menu != 1) {
            var result = '<ul>';
            for (var i = 0, n = menu.length; i < n; i++) {
                result += '<li class="p-menu">' + menu[i].name + '</li>';
                result += '<ul class="s-menu">';
                for (var j = 0, m = menu[i].children.length; j < m; j++) {
                    result += '<li>' + menu[i].children[j].name + '</li>';
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

    $('#edatagrid').edatagrid({});

    // insert a row with default values
    $('#edatagrid').edatagrid('addRow', {
        index: 2,
        row: {
            name: 'name1',
            addr: 'addr1'
        }
    });
});