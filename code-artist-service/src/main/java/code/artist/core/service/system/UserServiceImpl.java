package code.artist.core.service.system;

import code.artist.core.dao.system.MenuMapper;
import code.artist.core.dao.system.UserMapper;
import code.artist.core.facade.system.IUserService;
import code.artist.core.model.system.Menu;
import code.artist.core.model.system.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserServiceImpl implements IUserService {

    @Autowired
    UserMapper userMapper;
    @Autowired
    MenuMapper menuMapper;

    @Override
    public User login(String username, String password) {
        return userMapper.selUserByUser(new User(username, password));
    }

    @Override
    public List<User> selectUserByUser(User user) {
        return userMapper.selUserList(user);
    }

    @Override
    public List<Menu> showMenu(String userId) {
        return menuMapper.selMenuByUserId(userId);
    }
}
