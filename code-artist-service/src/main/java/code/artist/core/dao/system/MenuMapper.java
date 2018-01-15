package code.artist.core.dao.system;

import code.artist.core.model.system.Menu;

import java.util.List;

/**
 * 菜单操作
 *
 * @author 艾江南
 */
public interface MenuMapper {

    /**
     * 通过用户ID查询菜单列表
     *
     * @param userId 用户ID
     * @return 菜单列表
     */
    List<Menu> selMenuByUserId(String userId);

}