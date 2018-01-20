/**
 * 常量数据字典
 */
var DICT_CONSTANTS = {
    yesOrNo: ["否", "是"]
}

/**
 * EasyUI全局配置
 */
var easyuiConfig = {
    initDatagrid: function(id) {
        $("#" + id).datagrid({
            rownumbers: true,
            pagination: true,
            singleSelect: true,
            loadMsg: "数据加载中...",
        });
        $("#" + id).datagrid('getPager').pagination({
            beforePageText: '第',
            afterPageText: '页 共 {pages} 页',
            displayMsg: '当前显示 {from} - {to} 条记录 共 {total} 条记录'
        });
    },
    setToolbar: function(id, obj) {
        var toolbarArr = [];
        if (obj.add) {
            toolbarArr.push({
                iconCls: 'icon-add',
                text: '新建',
                handler: obj.add
            });
        }
        if (obj.edit) {
            toolbarArr.push({
                iconCls: 'icon-edit',
                text: '编辑',
                handler: obj.edit
            });
        }
        $("#" + id).datagrid({
            toolbar: toolbarArr
        });
    },
    newDialog: function(id, title, width, height, href) {
        $('#' + id).dialog({
            title: title,
            width: width,
            height: height,
            closed: false,
            cache: false,
            modal: true,
            href: href,
            buttons: [{
                text: '提交',
                handler: function() { alert("123"); }
            }, {
                text: '取消',
                handler: function() { $('#' + id).dialog('close'); }
            }]
        });
    }
}

/**
 * 调用数据字典函数
 */
var dict = {
    yesOrNo: function(value) {
        return DICT_CONSTANTS.yesOrNo[value];
    }
}