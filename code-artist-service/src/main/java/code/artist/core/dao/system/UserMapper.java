package code.artist.core.dao.system;

import code.artist.core.model.system.User;

public interface UserMapper {

    User selUserForLogin(User user);

}
