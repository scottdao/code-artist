package code.artist.cms.core.controller.systam;

import code.artist.common.constants.Constants.HTTP_CODE;
import code.artist.common.result.RestResponse;
import code.artist.core.facade.system.IMenuService;
import code.artist.core.facade.system.IRoleService;
import code.artist.core.facade.system.IUserService;
import code.artist.core.model.system.Menu;
import code.artist.core.model.system.Role;
import code.artist.core.model.system.User;
import code.artist.utils.common.IDUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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
    @Autowired
    private IMenuService menuService;

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
            return new RestResponse(loginUser);
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 查询所有用户
     *
     * @return 用户列表
     */
    @RequestMapping(value = "showUserList/{pageNum}/{pageSize}", method = RequestMethod.POST)
    public RestResponse showUser(@PathVariable("pageNum") Integer pageNum, @PathVariable("pageSize") Integer pageSize) {
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
            return new RestResponse(user.getRealname());
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
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
            return new RestResponse("删除成功！");
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
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
            return new RestResponse(menuList);
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 查询所有角色
     *
     * @return
     */
    @RequestMapping(value = "showRoleList/{pageNum}/{pageSize}", method = RequestMethod.POST)
    public RestResponse showRole(@PathVariable("pageNum") Integer pageNum, @PathVariable("pageSize") Integer pageSize) {
        String rolePage = roleService.selectEntityPage(pageNum, pageSize);
        if (!StringUtils.isEmpty(rolePage)) {
            return new RestResponse(rolePage);
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 查询所有角色（不分页）
     *
     * @return
     */
    @RequestMapping(value = "showRole", method = RequestMethod.POST)
    public RestResponse showRole() {
        List<Role> roleList = roleService.selectEntityList();
        if (!CollectionUtils.isEmpty(roleList)) {
            return new RestResponse(roleList);
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 新增角色
     *
     * @param userJson
     * @param paramJson
     * @return
     */
    @RequestMapping(value = "addRole", method = RequestMethod.POST)
    public RestResponse addRole(String userJson, String paramJson) {
        User loginUser = JSON.parseObject(userJson, User.class);
        Role role = JSON.parseObject(paramJson, Role.class);
        logger.info("role: {}", paramJson);
        role.setCreateUser(loginUser.getRealname());
        role.setUpdateUser(loginUser.getRealname());
        int flag = roleService.insertEntity(role);
        if (flag == 1) {
            return new RestResponse(HTTP_CODE.SUCCESS);
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 修改角色信息
     *
     * @param userJson
     * @param paramJson
     * @return
     */
    @RequestMapping(value = "editRole", method = RequestMethod.POST)
    public RestResponse editRole(String userJson, String paramJson) {
        User loginUser = JSON.parseObject(userJson, User.class);
        Role role = JSON.parseObject(paramJson, Role.class);
        logger.info("role: {}", paramJson);
        logger.info("roleCloss: {}", JSON.toJSONString(role));
        role.setUpdateUser(loginUser.getRealname());
        int flag = roleService.updateEntityById(role);
        if (flag == 1) {
            return new RestResponse(HTTP_CODE.SUCCESS);
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 删除角色
     *
     * @param userJson
     * @return
     */
    @RequestMapping(value = "deleteRole/{id}", method = RequestMethod.POST)
    public RestResponse deleteRole(String userJson, @PathVariable("id") Integer id) {
        User loginUser = JSON.parseObject(userJson, User.class);
        Role role = new Role();
        role.setId(id);
        role.setStatus(0);
        role.setUpdateUser(loginUser.getRealname());
        int flag = roleService.updateEntityById(role);
        if (flag == 1) {
            return new RestResponse("删除成功！");
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 通过管理员ID查询角色ID列表
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "chooseRole/{id}", method = RequestMethod.POST)
    public RestResponse chooseRole(@PathVariable("id") String id) {
        List<Integer> roleIdList = roleService.selectRoleIdsByUserId(id);
        logger.info("roleIdList: {}", JSON.toJSONString(roleIdList));
        return new RestResponse(roleIdList);
    }

    /**
     * 管理员分配角色
     *
     * @param paramJson
     * @return
     */
    @RequestMapping(value = "userRole", method = RequestMethod.POST)
    public RestResponse userRole(String paramJson) {
        List<Integer> roleIdList = new ArrayList();
        JSONObject jsonObject = JSON.parseObject(paramJson);
        String userId = jsonObject.getString("userId");
        try {
            JSONArray jsonArray = jsonObject.getJSONArray("roleIds[]");
            for (int i = 0, n = jsonArray.size(); i < n; i++) {
                roleIdList.add(Integer.valueOf((String) jsonArray.get(i)));
            }
        } catch (ClassCastException e) {
            roleIdList.add(jsonObject.getInteger("roleIds[]"));
        }
        logger.info("Array: {}", JSON.toJSONString(roleIdList));
        int flag = roleService.insertUserRole(userId, roleIdList);
        if (flag > 0) {
            return new RestResponse("分配角色成功！");
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 查询所有菜单
     *
     * @return
     */
    @RequestMapping(value = "showMenuList", method = RequestMethod.POST)
    public RestResponse showMenu() {
        List<Menu> menuList = menuService.selectEntityList();
        if (!CollectionUtils.isEmpty(menuList)) {
            return new RestResponse(menuList);
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 新增菜单
     *
     * @return
     */
    @RequestMapping(value = "addMenu", method = RequestMethod.POST)
    public RestResponse addMenu(String userJson, String paramJson) {
        User loginUser = JSON.parseObject(userJson, User.class);
        Menu menu = JSON.parseObject(paramJson, Menu.class);
        logger.info("role: {}", paramJson);
        menu.setCreateUser(loginUser.getRealname());
        menu.setUpdateUser(loginUser.getRealname());
        int flag = menuService.insertEntity(menu);
        if (flag == 1) {
            return new RestResponse(menu.getName());
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 修改菜单信息
     *
     * @param userJson
     * @param paramJson
     * @return
     */
    @RequestMapping(value = "editMenu", method = RequestMethod.POST)
    public RestResponse editMenu(String userJson, String paramJson) {
        User loginUser = JSON.parseObject(userJson, User.class);
        Menu menu = JSON.parseObject(paramJson, Menu.class);
        logger.info("menu: {}", paramJson);
        logger.info("menuCloss: {}", JSON.toJSONString(menu));
        menu.setUpdateUser(loginUser.getRealname());
        int flag = menuService.updateEntityById(menu);
        if (flag == 1) {
            return new RestResponse(menu.getName());
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 删除菜单
     *
     * @param userJson
     * @return
     */
    @RequestMapping(value = "deleteMenu/{id}", method = RequestMethod.POST)
    public RestResponse deleteMenu(String userJson, @PathVariable("id") Integer id) {
        User loginUser = JSON.parseObject(userJson, User.class);
        Menu menu = new Menu();
        menu.setId(id);
        menu.setStatus(0);
        menu.setUpdateUser(loginUser.getRealname());
        int flag = menuService.updateEntityById(menu);
        if (flag == 1) {
            return new RestResponse("删除成功！");
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 通过角色ID查询菜单ID列表
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "chooseMenu/{id}", method = RequestMethod.POST)
    public RestResponse chooseMenu(@PathVariable("id") Integer id) {
        List<Integer> menuIdList = menuService.selectMenuIdsByRoleId(id);
        logger.info("menuIdList: {}", JSON.toJSONString(menuIdList));
        return new RestResponse(menuIdList);
    }

    /**
     * 角色分配菜单
     *
     * @param paramJson
     * @return
     */
    @RequestMapping(value = "roleMenu", method = RequestMethod.POST)
    public RestResponse roleMenu(String paramJson) {
        logger.info("paramJson: {}", paramJson);
        List<Integer> menuIdList = new ArrayList();
        JSONObject jsonObject = JSON.parseObject(paramJson);
        Integer roleId = Integer.valueOf((String) jsonObject.get("roleId"));
        JSONArray jsonArray = jsonObject.getJSONArray("menuIds[]");
        for (int i = 0, n = jsonArray.size(); i < n; i++) {
            menuIdList.add(Integer.valueOf((String) jsonArray.get(i)));
        }
        logger.info("Array: {}", JSON.toJSONString(menuIdList));
        int flag = menuService.insertRoleMenu(roleId, menuIdList);
        if (flag > 0) {
            return new RestResponse("分配菜单成功！");
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

}
