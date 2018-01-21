package code.artist.core.service.system;

import code.artist.core.dao.system.MenuMapper;
import code.artist.core.dao.system.UserMapper;
import code.artist.core.facade.system.IUserService;
import code.artist.core.model.system.Menu;
import code.artist.core.model.system.User;
import code.artist.utils.common.IDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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
    public List<User> selectUserList() {
        return userMapper.selEntityList();
    }

    @Override
    public int insertUser(User user) {
        String id = IDUtil.getUUID();
        Date date = new Date();
        user.setId(id);
        user.setCreateTime(date);
        user.setUpdateTime(date);
        return userMapper.insEntity(user);
    }
    @Override
    public int updateUser(User operator,User admin){
        admin.setUpdateUser(operator.getUsername());
        admin.setUpdateTime(new Date());
        return userMapper.updEntityById(admin);
    }

    @Override
    public List<Menu> showMenu(String userId) {
        return menuMapper.selMenuByUserId(userId);
    }
}
