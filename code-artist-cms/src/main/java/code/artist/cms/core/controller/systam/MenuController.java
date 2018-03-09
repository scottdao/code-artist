package code.artist.cms.core.controller.systam;

import code.artist.common.constants.Constants;
import code.artist.common.result.RestResponse;
import code.artist.core.facade.system.IMenuService;
import code.artist.core.model.system.Menu;
import code.artist.core.model.system.User;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 后台管理系统权限菜单接口
 *
 * @author 艾江南
 */
@RestController
@RequestMapping("menu")
public class MenuController {

    final private Logger logger = LoggerFactory.getLogger(MenuController.class);

    @Autowired
    private IMenuService menuService;

    /**
     * 查询所有菜单
     *
     * @return 返回结果
     */
    @RequestMapping(method = RequestMethod.GET)
    public RestResponse showMenu() {
        List<Menu> menuList = menuService.selectEntityList();
        if (!CollectionUtils.isEmpty(menuList)) {
            return new RestResponse(menuList);
        } else {
            return new RestResponse(Constants.HTTP_CODE.ERROR);
        }
    }

    /**
     * 新增菜单
     *
     * @param userJson  当前登录管理员
     * @param paramJson 新增菜单信息
     * @return 返回结果
     */
    @RequestMapping(value = "add", method = RequestMethod.POST)
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
            return new RestResponse(Constants.HTTP_CODE.ERROR);
        }
    }

    /**
     * 修改菜单信息
     *
     * @param userJson  当前登录管理员
     * @param paramJson 修改菜单信息
     * @return 返回结果
     */
    @RequestMapping(value = "edit", method = RequestMethod.POST)
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
            return new RestResponse(Constants.HTTP_CODE.ERROR);
        }
    }

    /**
     * 删除菜单
     *
     * @param userJson 当前登录管理员
     * @param id       删除菜单ID
     * @return 返回结果
     */
    @RequestMapping(value = "{id}", method = RequestMethod.POST)
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
            return new RestResponse(Constants.HTTP_CODE.ERROR);
        }
    }

    /**
     * 通过角色ID查询菜单ID列表
     *
     * @param id 角色ID
     * @return 返回结果
     */
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public RestResponse chooseMenu(@PathVariable("id") Integer id) {
        List<Integer> menuIdList = menuService.selectMenuIdsByRoleId(id);
        logger.info("menuIdList: {}", JSON.toJSONString(menuIdList));
        return new RestResponse(menuIdList);
    }

    /**
     * 角色分配菜单
     *
     * @param paramJson 传入参数
     * @return 返回结果
     */
    @RequestMapping(value = "allot", method = RequestMethod.POST)
    public RestResponse allotMenu(String paramJson) {
        JSONObject jsonObject = JSON.parseObject(paramJson);
        Integer roleId = Integer.valueOf((String) jsonObject.get("roleId"));
        List<Integer> menuIdList = jsonObject.getJSONArray("menuIds[]").toJavaList(Integer.class);
        logger.info("Array: {}", JSON.toJSONString(menuIdList));
        int flag = menuService.insertRoleMenu(roleId, menuIdList);
        if (flag > 0) {
            return new RestResponse("分配菜单成功！");
        } else {
            return new RestResponse(Constants.HTTP_CODE.ERROR);
        }
    }

}
