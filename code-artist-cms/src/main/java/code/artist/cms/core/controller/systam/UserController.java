package code.artist.cms.core.controller.systam;

import code.artist.common.constants.Constants;
import code.artist.common.result.RestResponse;
import code.artist.core.facade.system.IUserService;
import code.artist.core.model.system.Menu;
import code.artist.core.model.system.User;
import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 后台管理系统权限控制接口
 *
 * @author 艾江南
 */
@RestController
@RequestMapping("user")
public class UserController {

    private Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private IUserService userService;

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public RestResponse login(User user) {
        logger.info("loginInfo: {}", JSON.toJSONString(user));
        User loginUser = userService.login(user.getUsername(), user.getPassword());
        if (loginUser != null) {
            return new RestResponse<>(Constants.Http.SUCCESS, null, loginUser);
        } else {
            return new RestResponse<>(Constants.Http.ERROR, null, null);
        }
    }

    @RequestMapping(value = "showMenu", method = RequestMethod.POST)
    public RestResponse showMenu(String userId) {
        logger.info("userId: {}", userId);
        List<Menu> menuList = userService.showMenu(userId);
        if (menuList != null && menuList.size() != 0) {
            return new RestResponse<>(Constants.Http.SUCCESS, null, menuList);
        } else {
            return new RestResponse<>(Constants.Http.ERROR, null, null);
        }
    }

}
