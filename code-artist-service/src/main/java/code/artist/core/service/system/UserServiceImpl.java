package code.artist.core.service.system;

import code.artist.core.dao.system.MenuMapper;
import code.artist.core.dao.system.UserMapper;
import code.artist.core.facade.system.IUserService;
import code.artist.core.model.system.Menu;
import code.artist.core.model.system.User;
import code.artist.core.service.base.BaseServiceImpl;
import code.artist.utils.common.DesUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserServiceImpl extends BaseServiceImpl<User> implements IUserService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private MenuMapper menuMapper;

    @Override
    public User login(String username, String password) {
        try {
            return userMapper.selUserByUser(new User(username, DesUtil.encrypt(password, DesUtil.getKey())));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Menu> showMenu(String userId) {
        return menuMapper.selMenuByUserId(userId);
    }
}
