package code.artist.core.dao.system;

import code.artist.common.base.BaseMapper;
import code.artist.core.model.system.Menu;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 菜单操作
 *
 * @author 艾江南
 */
public interface MenuMapper extends BaseMapper<Menu> {

    /**
     * 通过用户ID查询菜单列表
     *
     * @param userId 用户ID
     * @return 菜单列表
     */
    List<Menu> selMenuByUserId(String userId);

    /**
     * 通过角色ID查询该角色菜单ID
     *
     * @param roleId
     * @return
     */
    List<Integer> selRoleMenuByRoleId(Integer roleId);

    /**
     * 删除角色关联菜单
     *
     * @param roleId
     * @return
     */
    int delRoleMenuByRoleId(Integer roleId);

    /**
     * 批量插入角色菜单关系
     *
     * @param roleId
     * @param menuIds
     * @return
     */
    int insRoleMenu(@Param("roleId") Integer roleId, @Param("menuIds") List<Integer> menuIds);

}