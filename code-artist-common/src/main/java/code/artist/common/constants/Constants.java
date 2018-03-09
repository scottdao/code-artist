package code.artist.common.constants;

/**
 * 全局常量配置
 *
 * @author 艾江南
 */
public interface Constants {

    enum HTTP_CODE {

        SUCCESS(0, "success"),
        ERROR(1, "error");

        private int code;
        private String message;

        HTTP_CODE(int code, String message) {
            this.code = code;
            this.message = message;
        }

        public int getCode() {
            return code;
        }

        public String getMessage() {
            return message;
        }

    }

}
