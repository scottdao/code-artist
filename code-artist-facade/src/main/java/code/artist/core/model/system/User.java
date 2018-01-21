package code.artist.core.model.system;

import code.artist.common.base.BaseModel;

import java.io.Serializable;

/**
 * 用户实体类
 *
 * @author 艾江南
 */
public class User extends BaseModel implements Serializable {

    private String id;// 主键
    private String username;// 用户名
    private String password;// 密码
    private String realname;// 真实姓名
    private String phone;// 手机号
    private String address;// 地址
    private Integer isAdmin;// 是否为超级管理员
    private Integer status;// 状态

    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getRealname() {
        return realname;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public Integer getIsAdmin() {
        return isAdmin;
    }

    public Integer getStatus() {
        return status;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setIsAdmin(Integer isAdmin) {
        this.isAdmin = isAdmin;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

}