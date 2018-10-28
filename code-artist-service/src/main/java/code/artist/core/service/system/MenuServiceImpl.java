package code.artist.core.service.system;

import code.artist.core.dao.system.MenuMapper;
import code.artist.core.facade.system.IMenuService;
import code.artist.core.model.system.Menu;
import code.artist.core.service.base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("menuService")
public class MenuServiceImpl extends BaseServiceImpl<Menu> implements IMenuService {

    @Autowired
    private MenuMapper menuMapper;

    @Override
    public List<Integer> selectMenuIdsByRoleId(Integer id) {
        return menuMapper.selRoleMenuByRoleId(id);
    }

    @Override
    public int insertRoleMenu(Integer roleId, List<Integer> menuIdList) {
        menuMapper.delRoleMenuByRoleId(roleId);
        return menuMapper.insRoleMenu(roleId, menuIdList);
    }
}