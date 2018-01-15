package code.artist.core.dao.system;

import code.artist.core.model.system.Role;

import java.util.List;

public interface RoleMapper {

	int insRole(Role role);

	List<Role> selRoleList();

	int updRoleById(Role role);

}