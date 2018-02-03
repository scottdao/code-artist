package code.artist.cms.core.controller.systam;

import code.artist.common.constants.Constants;
import code.artist.common.result.RestResponse;
import code.artist.core.facade.system.IRoleService;
import code.artist.core.facade.system.IUserService;
import code.artist.core.model.system.Menu;
import code.artist.core.model.system.Role;
import code.artist.core.model.system.User;
import code.artist.utils.common.IDUtil;
import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
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
    @Autowired
    private IRoleService roleService;

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
        List<User> userList = userService.selectEntityList();
        if (!CollectionUtils.isEmpty(userList)) {
            return new RestResponse<>(Constants.Http.SUCCESS_CODE, Constants.Http.SUCCESS_MESSAGE, userList);
        } else {
            return new RestResponse<>(Constants.Http.ERROR_CODE, Constants.Http.ERROR_MESSAGE);
        }
    }

    /**
     * 新增管理员
     *
     * @param userJson  当前登录用户
     * @param paramJson 注册用户信息
     * @return 返回结果
     */
    @RequestMapping(value = "addUser", method = RequestMethod.POST)
    public RestResponse addUser(String userJson, String paramJson) {
        User loginUser = JSON.parseObject(userJson, User.class);
        logger.info("paramJson: {}", paramJson);
        User user = JSON.parseObject(paramJson, User.class);
        user.setId(IDUtil.getUUID());
        user.setCreateUser(loginUser.getRealname());
        user.setUpdateUser(loginUser.getRealname());
        int flag = userService.insertEntity(user);
        if (flag == 1) {
            return new RestResponse<>(Constants.Http.SUCCESS_CODE, Constants.Http.SUCCESS_MESSAGE, user.getRealname());
        } else {
            return new RestResponse<>(Constants.Http.ERROR_CODE, Constants.Http.ERROR_MESSAGE);
        }
    }

    /**
     * 修改管理员信息
     *
     * @param userJson  当前登录用户
     * @param paramJson 修改参数
     * @return 返回结果
     */
    @RequestMapping(value = "editUser", method = RequestMethod.POST)
    public RestResponse editUser(String userJson, String paramJson) {
        User operator = JSON.parseObject(userJson, User.class);
        User admin = JSON.parseObject(paramJson, User.class);
        if (admin == null || StringUtils.isEmpty(admin.getId())) {
            return new RestResponse<>(Constants.Http.ERROR_CODE, Constants.Http.ERROR_MESSAGE);
        }
        admin.setUpdateUser(operator.getRealname());
        int flag = userService.updateEntityById(admin);
        if (flag == 1) {
            return new RestResponse<>(Constants.Http.SUCCESS_CODE, Constants.Http.SUCCESS_MESSAGE, admin.getRealname());
        } else {
            return new RestResponse<>(Constants.Http.ERROR_CODE, Constants.Http.ERROR_MESSAGE);
        }
    }

    /**
     * 删除管理员
     *
     * @param userJson
     * @param id
     * @return
     */
    @RequestMapping(value = "deleteUser/{id}", method = RequestMethod.POST)
    public RestResponse deleteUser(String userJson, @PathVariable("id") String id) {
        User loginUser = JSON.parseObject(userJson, User.class);
        User user = new User();
        user.setId(id);
        user.setStatus(0);
        user.setUpdateUser(loginUser.getRealname());
        int flag = userService.updateEntityById(user);
        if (flag == 1) {
            return new RestResponse<>(Constants.Http.SUCCESS_CODE, Constants.Http.SUCCESS_MESSAGE, "删除成功！");
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
        if (!CollectionUtils.isEmpty(menuList)) {
            return new RestResponse<>(Constants.Http.SUCCESS_CODE, Constants.Http.SUCCESS_MESSAGE, menuList);
        } else {
            return new RestResponse<>(Constants.Http.ERROR_CODE, Constants.Http.ERROR_MESSAGE);
        }
    }

    /**
     * 查询所有角色
     *
     * @return
     */
    @RequestMapping(value = "showRole", method = RequestMethod.POST)
    public RestResponse showRole() {
        List<Role> roleList = roleService.selectEntityList();
        if (!CollectionUtils.isEmpty(roleList)) {
            return new RestResponse<>(Constants.Http.SUCCESS_CODE, Constants.Http.SUCCESS_MESSAGE, roleList);
        } else {
            return new RestResponse<>(Constants.Http.ERROR_CODE, Constants.Http.ERROR_MESSAGE);
        }
    }

}
