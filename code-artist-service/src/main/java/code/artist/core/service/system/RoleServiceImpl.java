package code.artist.core.service.system;

import code.artist.core.facade.system.IRoleService;
import code.artist.core.model.system.Role;
import code.artist.core.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

@Service("roleService")
public class RoleServiceImpl extends BaseServiceImpl<Role> implements IRoleService {
}