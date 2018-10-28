package code.artist.core.model.system;

import code.artist.common.base.BaseModel;

import java.io.Serializable;
import java.util.List;

public class Menu extends BaseModel implements Serializable {

    private Integer id;// 主键自增
    private String name;// 菜单名称
    private String url;// 菜单页面链接
    private Integer sort;// 排序
    private Integer isLeaf;// 是否为父菜单
    private Integer parentId;// 父菜单ID
    private Integer status;// 状态
    private List<Menu> children;// 子菜单

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getUrl() {
        return url;
    }

    public Integer getSort() {
        return sort;
    }

    public Integer getIsLeaf() {
        return isLeaf;
    }

    public Integer getParentId() {
        return parentId;
    }

    public Integer getStatus() {
        return status;
    }

    public List<Menu> getChildren() {
        return children;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public void setIsLeaf(Integer isLeaf) {
        this.isLeaf = isLeaf;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public void setChildren(List<Menu> children) {
        this.children = children;
    }
}