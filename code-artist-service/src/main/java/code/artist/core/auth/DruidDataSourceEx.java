package code.artist.core.auth;

import code.artist.utils.common.DesUtil;
import com.alibaba.druid.pool.DruidDataSource;

/**
 * 数据库加密
 *
 * @author 艾江南
 */
public class DruidDataSourceEx extends DruidDataSource {

    @Override
    public void setUrl(String jdbcUrl) {
        try {
            super.setUrl(DesUtil.decrypt(jdbcUrl, DesUtil.getKey()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void setUsername(String username) {
        try {
            super.setUsername(DesUtil.decrypt(username, DesUtil.getKey()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void setPassword(String password) {
        try {
            super.setPassword(DesUtil.decrypt(password, DesUtil.getKey()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
