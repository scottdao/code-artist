package code.artist.core.facade.system;

import code.artist.core.model.system.User;

public interface IUserService {

    User login(String username, String password);

}
