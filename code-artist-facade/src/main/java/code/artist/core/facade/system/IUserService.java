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
     * 查询所有用户（如果非超级管理员，只显示自己）
     *
     * @param user 用户筛选条件
     * @return 用户列表
     */
    List<User> selectUserByUser(User user);

    /**
     * 通过用户ID查询菜单列表
     *
     * @param userId 用户ID
     * @return 菜单列表
     */
    List<Menu> showMenu(String userId);

}
