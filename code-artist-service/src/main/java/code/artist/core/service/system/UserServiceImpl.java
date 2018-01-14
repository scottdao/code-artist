package code.artist.core.service.system;

import code.artist.core.dao.system.UserMapper;
import code.artist.core.facade.system.IUserService;
import code.artist.core.model.system.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements IUserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public User login(String username, String password) {
        return userMapper.selUserForLogin(new User(username, password));
    }

}
