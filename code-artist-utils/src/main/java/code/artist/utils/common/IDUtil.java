package code.artist.utils.common;

import java.util.UUID;

/**
 * ID生成工具类
 *
 * @author 艾江南
 */
public class IDUtil {

    /**
     * 生成UUID
     *
     * @return
     */
    public static String getUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }

}
