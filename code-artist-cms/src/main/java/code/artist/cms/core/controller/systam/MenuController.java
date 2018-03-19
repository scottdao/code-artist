package code.artist.cms.core.controller.systam;

import code.artist.cms.core.constants.Constants.WebSession;
import code.artist.common.constants.Constants.HTTP_CODE;
import code.artist.common.result.RestResponse;
import code.artist.core.facade.system.IMenuService;
import code.artist.core.model.system.Menu;
import code.artist.core.model.system.User;
import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
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
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

    /**
     * 新增菜单
     *
     * @param menu 新增菜单信息
     * @return 返回结果
     */
    @RequestMapping(value = "add", method = RequestMethod.POST)
    public RestResponse addMenu(Menu menu, HttpSession session) {
        User loginUser = (User) session.getAttribute(WebSession.CURRENT_LOGIN_USER_SESSION);
        logger.info("addMenu: {}", JSON.toJSONString(menu));
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
     * @param menu 修改菜单信息
     * @return 返回结果
     */
    @RequestMapping(value = "edit", method = RequestMethod.POST)
    public RestResponse editMenu(Menu menu, HttpSession session) {
        User loginUser = (User) session.getAttribute(WebSession.CURRENT_LOGIN_USER_SESSION);
        logger.info("editMenu: {}", JSON.toJSONString(menu));
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
     * @param id 删除菜单ID
     * @return 返回结果
     */
    @RequestMapping(value = "{id}", method = RequestMethod.POST)
    public RestResponse deleteMenu(HttpSession session, @PathVariable("id") Integer id) {
        User loginUser = (User) session.getAttribute(WebSession.CURRENT_LOGIN_USER_SESSION);
        Menu menu = new Menu();
        menu.setId(id);
        menu.setStatus(0);
        menu.setUpdateUser(loginUser.getRealname());
        int flag = menuService.updateEntityById(menu);
        if (flag == 1) {
            return new RestResponse(HTTP_CODE.SUCCESS.getMessage());
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
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
     * @param roleId  角色ID
     * @param menuIds 菜单ID
     * @return 返回结果
     */
    @RequestMapping(value = "allot", method = RequestMethod.POST)
    public RestResponse allotMenu(Integer roleId, String menuIds) {
        List menuIdList = JSON.parseObject(menuIds, List.class);
        logger.info("allotMenu: {}", JSON.toJSONString(menuIdList));
        int flag = menuService.insertRoleMenu(roleId, menuIdList);
        if (flag > 0) {
            return new RestResponse(HTTP_CODE.SUCCESS.getMessage());
        } else {
            return new RestResponse(HTTP_CODE.ERROR);
        }
    }

}
