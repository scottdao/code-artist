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
     * 用户登录
     *
     * @param username 用户名
     * @param password 密码
     * @return 登录的用户
     */
    User login(String username, String password);

    /**
     * 查询所有用户
     *
     * @return 用户列表
     */
    List<User> selectUserList();

    /**
     * 注册管理员用户
     *
     * @param user
     * @return
     */
    int insertUser(User user);

    /**
     * 更改管理员用户
     *
     * @param admin
     * @return
     */
    int updateUser(User admin);

    /**
     * 通过用户ID查询菜单列表
     *
     * @param userId 用户ID
     * @return 菜单列表
     */
    List<Menu> showMenu(String userId);

}
