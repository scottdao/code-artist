USE codeartist;
-- 用户表
CREATE TABLE t_user (
    id          VARCHAR(50) PRIMARY KEY COMMENT '主键',
    username    VARCHAR(50) NOT NULL COMMENT '用户名',
    password    VARCHAR(50) NOT NULL COMMENT '密码',
    realname    VARCHAR(50) NOT NULL COMMENT '真实姓名',
    phone       VARCHAR(20) NOT NULL COMMENT '手机号',
    address     VARCHAR(300) COMMENT '地址',
    is_admin    TINYINT(2) DEFAULT 0 COMMENT '是否为超级管理员',
    status      TINYINT(2) COMMENT '状态',
    create_user VARCHAR(50) COMMENT '创建人',
    create_time DATETIME COMMENT '创建时间',
    update_user VARCHAR(50) COMMENT '修改人',
    update_time DATETIME COMMENT '修改时间',
    description TEXT COMMENT '描述'
) COMMENT '用户表';

-- 角色表
CREATE TABLE t_role (
    id          INT(10) PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    code        VARCHAR(10) NOT NULL COMMENT '角色编码',
    name        VARCHAR(50) NOT NULL COMMENT '角色名称',
    status      TINYINT(2) COMMENT '状态',
    create_user VARCHAR(50) COMMENT '创建人',
    create_time DATETIME COMMENT '创建时间',
    update_user VARCHAR(50) COMMENT '修改人',
    update_time DATETIME COMMENT '修改时间',
    description TEXT COMMENT '描述'
) COMMENT '角色表';

-- 菜单表
CREATE TABLE t_menu (
    id          INT(10) PRIMARY KEY AUTO_INCREMENT COMMENT '主键自增',
    name        VARCHAR(50)  NOT NULL COMMENT '菜单名称',
    url         VARCHAR(200) NOT NULL COMMENT '菜单页面链接',
    sort        INT(2) COMMENT '排序',
    is_leaf     TINYINT(2) COMMENT '是否为父菜单',
    parent_id   INT(10) COMMENT '父菜单ID',
    status      TINYINT(2) COMMENT '状态',
    create_user VARCHAR(50) COMMENT '创建人',
    create_time DATETIME COMMENT '创建时间',
    update_user VARCHAR(50) COMMENT '修改人',
    update_time DATETIME COMMENT '修改时间',
    description TEXT COMMENT '描述'
) COMMENT '菜单表';

-- 用户角色表
CREATE TABLE t_user_role (
    id      BIGINT(20) PRIMARY KEY AUTO_INCREMENT COMMENT '用户角色表id',
    user_id VARCHAR(50) NOT NULL COMMENT '用户id',
    role_id INT(10)     NOT NULL COMMENT '用户id'
) COMMENT '用户角色表';

-- 用户菜单表
CREATE TABLE t_role_menu (
    id      BIGINT(20) PRIMARY KEY AUTO_INCREMENT COMMENT '用户菜单表id',
    role_id INT(10) NOT NULL COMMENT '角色id',
    menu_id INT(10) NOT NULL COMMENT '菜单id'
) COMMENT '用户菜单表';