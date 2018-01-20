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
import org.springframework.util.CollectionUtils;
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

    /**
     * 管理员登陆
     *
     * @param user 登陆用户用户名和密码
     * @return 返回结果
     */
    @RequestMapping(value = "login", method = RequestMethod.POST)
    public RestResponse login(User user) {
        logger.info("loginInfo: {}", JSON.toJSONString(user));
        User loginUser = userService.login(user.getUsername(), user.getPassword());
        if (loginUser != null) {
            return new RestResponse<>(Constants.Http.SUCCESS_CODE, Constants.Http.SUCCESS_MESSAGE, loginUser);
        } else {
            return new RestResponse<>(Constants.Http.ERROR_CODE, Constants.Http.ERROR_MESSAGE);
        }
    }

    /**
     * 查询所有用户
     *
     * @return 用户列表
     */
    @RequestMapping(value = "showUserList", method = RequestMethod.POST)
    public RestResponse showUserList() {
        List<User> userList = userService.selectUserList();
        if (!CollectionUtils.isEmpty(userList)) {
            return new RestResponse<>(Constants.Http.SUCCESS_CODE, Constants.Http.SUCCESS_MESSAGE, userList);
        } else {
            return new RestResponse<>(Constants.Http.ERROR_CODE, Constants.Http.ERROR_MESSAGE);
        }
    }

    /**
     * 显示菜单
     *
     * @param userJson 当前登陆用户
     * @return 返回结果
     */
    @RequestMapping(value = "showMenu", method = RequestMethod.POST)
    public RestResponse showMenu(String userJson) {
        logger.info("userJson: {}", userJson);
        User user = JSON.parseObject(userJson, User.class);
        List<Menu> menuList = userService.showMenu(user.getId());
        if (menuList != null && menuList.size() != 0) {
            return new RestResponse<>(Constants.Http.SUCCESS_CODE, Constants.Http.SUCCESS_MESSAGE, menuList);
        } else {
            return new RestResponse<>(Constants.Http.ERROR_CODE, Constants.Http.ERROR_MESSAGE);
        }
    }

}
