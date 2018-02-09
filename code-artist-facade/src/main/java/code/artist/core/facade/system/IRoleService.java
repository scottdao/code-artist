package code.artist.core.facade.system;

import code.artist.common.base.IBaseService;
import code.artist.core.model.system.Role;

import java.util.List;

/**
 * 管理员角色
 *
 * @author 艾江南
 */
public interface IRoleService extends IBaseService<Role> {

    /**
     * 通过用户ID查询该用户角色ID
     *
     * @param id
     * @return
     */
    List<Integer> selectRoleIdsByUserId(String id);

    /**
     * 管理员分配角色
     *
     * @param userId
     * @param roleIdList
     * @return
     */
    int insertUserRole(String userId, List<Integer> roleIdList);

}