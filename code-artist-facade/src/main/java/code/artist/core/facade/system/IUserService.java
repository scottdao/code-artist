package code.artist.core.facade.system;

import code.artist.core.model.system.Menu;
import code.artist.core.model.system.User;

import java.util.List;

/**
 * 后台管理系统权限管理
 *
 * @author 艾江南
 */
public interface IUserService {

    /**
     * 用户登陆
     *
     * @param username 用户名
     * @param password 密码
     * @return
     */
    User login(String username, String password);

    /**
     * 通过用户ID查询菜单列表
     *
     * @param userId 用户ID
     * @return 菜单列表
     */
    List<Menu> showMenu(String userId);

}
