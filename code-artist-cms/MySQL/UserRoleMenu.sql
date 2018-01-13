use codeartist;
-- 用户表
create table t_user
(
  id varchar(50) primary key comment '主键',
  username varchar(50) not null comment '用户名',
  password varchar(50) not null comment '密码',
  realname varchar(50) not null comment '真实姓名',
  phone varchar(20) not null comment '手机号',
  address varchar(300) comment '地址',
  is_admin tinyint(2) default 0 comment '是否为超级管理员',
  status tinyint(2) comment '状态',
  create_user varchar(50) comment '创建人',
  create_time datetime comment '创建时间',
  update_user varchar(50) comment '修改人',
  update_time datetime comment '修改时间',
  description text comment '描述'
) comment '用户表';



-- 角色表
create table t_role
(
  id int(10) primary key auto_increment comment '主键',
  code varchar(10) not null comment '角色编码',
  name varchar(50) not null comment '角色名称',
  status tinyint(2) comment '状态',
  create_user varchar(50) comment '创建人',
  create_time datetime comment '创建时间',
  update_user varchar(50) comment '修改人',
  update_time datetime comment '修改时间',
  description text comment '描述'
) comment '角色表';


-- 菜单表
create table t_menu
(
  id int(10) primary key auto_increment comment '主键自增',
  name varchar(50) not null comment '菜单名称',
  url varchar(200) not null comment '菜单页面链接',
  sort int(2) comment '排序',
  is_leaf tinyint(5) comment '是否为父菜单',
  parent_id int(2) comment '父菜单ID',
  status tinyint(2) comment '状态',
  create_user varchar(50) comment '创建人',
  create_time datetime comment '创建时间',
  update_user varchar(50) comment '修改人',
  update_time datetime comment '修改时间',
  description text comment '描述'
) comment '菜单表';


-- 用户角色表
create table t_user_role
(
  id bigint(20) primary key auto_increment comment '用户角色表id',
  user_id varchar(50) not null comment '用户id',
  role_id int(10) not null comment '用户id'
) comment '用户角色表';


-- 用户菜单表
create table t_role_menu
(
  id bigint(20) primary key auto_increment comment '用户菜单表id',
  role_id int(10) not null comment '角色id',
  menu_id int(10) not null comment '菜单id'
) comment '用户菜单表';