package code.artist.common.base;

import java.util.List;

/**
 * 基本Service接口
 *
 * @author 艾江南
 */
public interface IBaseService<T extends BaseModel> {

    /**
     * 查询所有
     *
     * @return
     */
    List<T> selectEntityList();

    /**
     * 分页查询
     *
     * @param pageNum
     * @param pageSize
     * @return
     */
    String selectEntityPage(Integer pageNum, Integer pageSize);

    /**
     * 插入
     *
     * @param entity
     * @return
     */
    int insertEntity(T entity);

    /**
     * 通过ID更新
     *
     * @param entity
     * @return
     */
    int updateEntityById(T entity);

    /**
     * 通过ID查询
     *
     * @param id
     * @return
     */
    T selectEntityById(Object id);

}