package code.artist.core.service.system;

import code.artist.core.facade.system.IAppUserService;
import code.artist.core.model.system.AppUser;
import code.artist.core.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

@Service("appUserService")
public class AppUserServiceImpl extends BaseServiceImpl<AppUser> implements IAppUserService {


}
