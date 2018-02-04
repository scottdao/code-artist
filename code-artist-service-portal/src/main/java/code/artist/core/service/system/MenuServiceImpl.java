package code.artist.core.service.system;

import code.artist.core.facade.system.IMenuService;
import code.artist.core.model.system.Menu;
import code.artist.core.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

@Service("menuService")
public class MenuServiceImpl extends BaseServiceImpl<Menu> implements IMenuService {
}