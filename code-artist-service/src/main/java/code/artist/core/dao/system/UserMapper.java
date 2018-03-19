package code.artist.core.dao.system;

import code.artist.common.base.BaseMapper;
import code.artist.core.model.system.User;

/**
 * 用户操作
 *
 * @author 艾江南
 */
public interface UserMapper extends BaseMapper<User> {

    /**
     * 通过用户查询用户（返回字段缺省）
     *
     * @param username 管理员用户名
     * @return 查询的结果，不存在返回空
     */
    User selUserByName(String username);

}
