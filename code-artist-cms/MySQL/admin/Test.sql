INSERT INTO t_user (id, username, password, realname, phone, address, is_admin,status) VALUES ('1', 'ajn', 'oEOWH3ZwNys=', '艾江南', '13716050046', '湖南省', 1, 1);
INSERT INTO t_role (code, name, status) VALUES ('ADMIN', '超级管理员', 1);
INSERT INTO t_user_role (user_id, role_id) VALUES ('1', 1);
INSERT INTO t_menu (id, name, url, sort, is_leaf, parent_id, status) VALUES (1, '系统管理', '', 1, 0, 0, 1);
INSERT INTO t_menu (id, name, url, sort, is_leaf, parent_id, status) VALUES (2, '用户管理', '/system/admin.html', 1, 1, 1, 1);
INSERT INTO t_menu (id, name, url, sort, is_leaf, parent_id, status) VALUES (3, '角色管理', '/system/role.html', 2, 1, 1, 1);
INSERT INTO t_menu (id, name, url, sort, is_leaf, parent_id, status) VALUES (4, '菜单管理', '/system/menu.html', 3, 1, 1, 1);
INSERT INTO t_role_menu (role_id, menu_id) VALUES (1, 1);
INSERT INTO t_role_menu (role_id, menu_id) VALUES (1, 2);
INSERT INTO t_role_menu (role_id, menu_id) VALUES (1, 3);
INSERT INTO t_role_menu (role_id, menu_id) VALUES (1, 4);