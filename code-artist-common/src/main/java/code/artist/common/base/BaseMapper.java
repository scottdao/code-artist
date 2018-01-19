package code.artist.common.base;

import java.util.List;

/**
 * 基本Mapper接口
 *
 * @author 艾江南
 */
public interface BaseMapper<T> {

    /**
     * 插入
     *
     * @param entity
     * @return
     */
    int insEntity(T entity);

    /**
     * 查询列表
     *
     * @return
     */
    List<T> selEntityList();

    /**
     * 通过ID查询
     *
     * @param id
     * @return
     */
    T selEntityById(Object id);

    /**
     * 通过ID更新
     *
     * @param entity
     * @return
     */
    int updEntityById(T entity);

}
