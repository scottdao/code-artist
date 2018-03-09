package code.artist.cms.core.controller.systam;

import code.artist.common.constants.Constants;
import code.artist.common.constants.Constants.HTTP_CODE;
import code.artist.common.result.RestResponse;
import code.artist.core.facade.system.IUserService;
import code.artist.core.model.system.Menu;
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
 * 后台管理系统权限管理员接口
 *
 * @author 艾江南
 */
@RestController
@RequestMapping("user")
public class UserController {

    final private Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private IUserService userService;

    /**
     * 管理员登陆
     *
     * @param user 登陆管理员管理员名和密码
     * @return 返回结果
     */
    @RequestMapping(value = "login", method = RequestMethod.POST)
    public RestResponse login(User user) {
        logger.info("loginInfo: {}", JSON.toJSONString(user));
        User loginUser = userService.login(user.getUsername(), user.getPassword());
        if (loginUser != null) {
            return new RestResponse(loginUser);
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 显示菜单
     *
     * @param userId 当前登陆管理员ID
     * @return 返回结果
     */
    @RequestMapping(value = "menu/{userId}", method = RequestMethod.GET)
    public RestResponse showMenu(@PathVariable("userId") String userId) {
        logger.info("userId: {}", userId);
        List<Menu> menuList = userService.showMenu(userId);
        if (!CollectionUtils.isEmpty(menuList)) {
            return new RestResponse(menuList);
        } else {
            return new RestResponse(Constants.HTTP_CODE.ERROR);
        }
    }

    /**
     * 查询所有管理员
     *
     * @param pageNum  页码
     * @param pageSize 每页大小
     * @return 返回结果
     */
    @RequestMapping(value = "{pageNum}/{pageSize}", method = RequestMethod.GET)
    public RestResponse showUserPage(@PathVariable("pageNum") Integer pageNum, @PathVariable("pageSize") Integer pageSize) {
        String userPage = userService.selectEntityPage(pageNum, pageSize);
        if (!StringUtils.isEmpty(userPage)) {
            return new RestResponse(userPage);
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 新增管理员
     *
     * @param userJson  当前登录管理员
     * @param paramJson 注册管理员信息
     * @return 返回结果
     */
    @RequestMapping(value = "add", method = RequestMethod.POST)
    public RestResponse addUser(String userJson, String paramJson) {
        User loginUser = JSON.parseObject(userJson, User.class);
        logger.info("paramJson: {}", paramJson);
        User user = JSON.parseObject(paramJson, User.class);
        user.setId(IDUtil.getUUID());
        user.setCreateUser(loginUser.getRealname());
        user.setUpdateUser(loginUser.getRealname());
        int flag = userService.insertEntity(user);
        if (flag == 1) {
            return new RestResponse(user.getRealname());
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 修改管理员信息
     *
     * @param userJson  当前登录管理员
     * @param paramJson 修改参数
     * @return 返回结果
     */
    @RequestMapping(value = "edit", method = RequestMethod.POST)
    public RestResponse editUser(String userJson, String paramJson) {
        User operator = JSON.parseObject(userJson, User.class);
        User admin = JSON.parseObject(paramJson, User.class);
        if (admin == null || StringUtils.isEmpty(admin.getId())) {
            return new RestResponse(HTTP_CODE.ERROR);
        }
        admin.setUpdateUser(operator.getRealname());
        int flag = userService.updateEntityById(admin);
        if (flag == 1) {
            return new RestResponse(admin.getRealname());
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 删除管理员
     *
     * @param userJson 当前登录管理员
     * @param id       删除管理员ID
     * @return 返回结果
     */
    @RequestMapping(value = "{id}", method = RequestMethod.POST)
    public RestResponse deleteUser(String userJson, @PathVariable("id") String id) {
        User loginUser = JSON.parseObject(userJson, User.class);
        User user = new User();
        user.setId(id);
        user.setStatus(0);
        user.setUpdateUser(loginUser.getRealname());
        int flag = userService.updateEntityById(user);
        if (flag == 1) {
            return new RestResponse("删除成功！");
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

}
