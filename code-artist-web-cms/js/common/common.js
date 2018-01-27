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
        if (obj.delete) {
            toolbarArr.push({
                iconCls: 'icon-remove',
                text: '删除',
                handler: obj.delete
            });
        }
        $("#" + id).datagrid({
            toolbar: toolbarArr
        });
    },
    newDialog: function(id, title, width, height, href, func) {
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
                handler: func
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

/**
 * 表单验证
 */
$.extend($.fn.validatebox.defaults.rules, {
    /** 长度范围 */
    mLength: {
        validator: function(value, param) {
            console.info("enter");
            return value.length >= param[0] && value.length <= param[1];
        },
        message: '输入字符长度在{0}～{1}之间'
    },
    /** 确认密码 */
    equals: {
        validator: function(value, param) {
            return value == $(param[0]).val();
        },
        message: '两次密码输入不一致'
    }
});

/**
 * EasyUI显示中文和初始化设置
 */
if ($.fn.pagination) {
    $.fn.pagination.defaults.beforePageText = '第';
    $.fn.pagination.defaults.afterPageText = '页 共 {pages} 页';
    $.fn.pagination.defaults.displayMsg = '当前显示 {from} - {to} 条记录 共 {total} 条记录';
}
if ($.fn.datagrid) {
    $.fn.datagrid.defaults.rownumbers = true;
    $.fn.datagrid.defaults.pagination = true;
    $.fn.datagrid.defaults.singleSelect = true;
    $.fn.datagrid.defaults.loadMsg = '数据加载中...';
}
if ($.fn.treegrid && $.fn.datagrid) {
    $.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager) {
    $.messager.defaults.ok = '确定';
    $.messager.defaults.cancel = '取消';
}
$.map(['validatebox', 'textbox', 'passwordbox', 'filebox', 'searchbox',
    'combo', 'combobox', 'combogrid', 'combotree',
    'datebox', 'datetimebox', 'numberbox',
    'spinner', 'numberspinner', 'timespinner', 'datetimespinner'
], function(plugin) {
    if ($.fn[plugin]) {
        $.fn[plugin].defaults.missingMessage = '该输入项不能为空';
    }
});
if ($.fn.validatebox) {
    $.fn.validatebox.defaults.rules.email.message = '请输入有效的电子邮件地址';
    $.fn.validatebox.defaults.rules.url.message = '请输入有效的URL地址';
    $.fn.validatebox.defaults.rules.length.message = '输入内容长度必须介于{0}和{1}之间';
    $.fn.validatebox.defaults.rules.remote.message = '请修正该字段';
}
if ($.fn.calendar) {
    $.fn.calendar.defaults.weeks = ['日', '一', '二', '三', '四', '五', '六'];
    $.fn.calendar.defaults.months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
}
if ($.fn.datebox) {
    $.fn.datebox.defaults.currentText = '今天';
    $.fn.datebox.defaults.closeText = '关闭';
    $.fn.datebox.defaults.okText = '确定';
    $.fn.datebox.defaults.formatter = function(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
    };
    $.fn.datebox.defaults.parser = function(s) {
        if (!s) return new Date();
        var ss = s.split('-');
        var y = parseInt(ss[0], 10);
        var m = parseInt(ss[1], 10);
        var d = parseInt(ss[2], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            return new Date(y, m - 1, d);
        } else {
            return new Date();
        }
    };
}
if ($.fn.datetimebox && $.fn.datebox) {
    $.extend($.fn.datetimebox.defaults, {
        currentText: $.fn.datebox.defaults.currentText,
        closeText: $.fn.datebox.defaults.closeText,
        okText: $.fn.datebox.defaults.okText
    });
}
if ($.fn.datetimespinner) {
    $.fn.datetimespinner.defaults.selections = [
        [0, 4],
        [5, 7],
        [8, 10],
        [11, 13],
        [14, 16],
        [17, 19]
    ]
}