package code.artist.common.constants;

/**
 * 全局常量配置
 *
 * @author 艾江南
 */
public interface Constants {

    /**
     * HTTP接口访问状态
     */
    interface Http {
        /**
         * 接口访问成功状态码
         */
        int SUCCESS_CODE = 0;
        /**
         * 接口访问成功消息
         */
        String SUCCESS_MESSAGE = "success";
        /**
         * 接口访问失败状态码
         */
        int ERROR_CODE = 1;
        /**
         * 接口访问失败消息
         */
        String ERROR_MESSAGE = "error";
    }

}
