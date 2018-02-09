package code.artist.core.dao.system;

import code.artist.common.base.BaseMapper;
import code.artist.core.model.system.Role;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RoleMapper extends BaseMapper<Role> {

    /**
     * 通过管理员ID查询角色
     *
     * @param userId
     * @return
     */
    List<Integer> selUserRoleByUserId(String userId);

    /**
     * 删除管理员关联角色
     *
     * @param userId
     * @return
     */
    int delUserRoleByUserId(String userId);

    /**
     * 批量插入管理员角色关系
     *
     * @param userId
     * @param roleIds
     * @return
     */
    int insUserRole(@Param("userId") String userId, @Param("roleIds") List<Integer> roleIds);

}