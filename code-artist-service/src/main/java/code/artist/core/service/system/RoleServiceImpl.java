package code.artist.core.service.system;

import code.artist.core.dao.system.RoleMapper;
import code.artist.core.facade.system.IRoleService;
import code.artist.core.model.system.Role;
import code.artist.core.service.base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("roleService")
public class RoleServiceImpl extends BaseServiceImpl<Role> implements IRoleService {

    @Autowired
    private RoleMapper roleMapper;

    @Override
    public List<Integer> selectRoleIdsByUserId(String id) {
        return roleMapper.selUserRoleByUserId(id);
    }

    @Override
    public int insertUserRole(String userId, List<Integer> roleIdList) {
        roleMapper.delUserRoleByUserId(userId);
        return roleMapper.insUserRole(userId, roleIdList);
    }
}