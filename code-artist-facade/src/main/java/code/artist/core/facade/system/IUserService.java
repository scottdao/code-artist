package code.artist.core.facade.system;

import code.artist.common.base.IBaseService;
import code.artist.core.model.system.Menu;
import code.artist.core.model.system.User;

import java.util.List;

/**
 * 后台管理系统权限管理
 *
 * @author 艾江南
 */
public interface IUserService extends IBaseService<User> {

    /**
     * 用户登录
     *
     * @param username 用户名
     * @return 登录的用户
     */
    User login(String username);

    /**
     * 通过用户ID查询菜单列表
     *
     * @param userId 用户ID
     * @return 菜单列表
     */
    List<Menu> showMenu(String userId);

}
