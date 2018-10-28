package code.artist.core.facade.system;

import code.artist.common.base.IBaseService;
import code.artist.core.model.system.Menu;

import java.util.List;

/**
 * 菜单
 *
 * @author 艾江南
 */
public interface IMenuService extends IBaseService<Menu> {

    /**
     * 通过角色ID查询该角色菜单ID
     *
     * @param id
     * @return
     */
    List<Integer> selectMenuIdsByRoleId(Integer id);

    /**
     * 角色分配菜单
     *
     * @param roleId
     * @param menuIdList
     * @return
     */
    int insertRoleMenu(Integer roleId, List<Integer> menuIdList);

}