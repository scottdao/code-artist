/**
 * EasyUI全局配置
 */
var easyuiConfig = {
    setPager: function(id) {
        $("#" + id).datagrid({
            loadMsg: "数据加载中...",
        });
        $("#" + id).datagrid('getPager').pagination({
            beforePageText: '第',
            afterPageText: '页    共 {pages} 页',
            displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
        });
    }
}