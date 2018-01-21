package code.artist.core.model.system;

import code.artist.common.base.BaseModel;

import java.io.Serializable;

public class Role extends BaseModel implements Serializable {

    private Integer id;// 主键
    private String code;// 角色编码
    private String name;// 角色名称
    private Integer status;// 状态

    public Integer getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public Integer getStatus() {
        return status;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

}