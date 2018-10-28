package code.artist.common.result;

import code.artist.common.constants.Constants.HTTP_CODE;

public class RestResponse {

    private int code;
    private String message;
    private Object data;

    public RestResponse(HTTP_CODE httpCode, Object data) {
        this(httpCode);
        this.data = data;
    }

    public RestResponse(HTTP_CODE httpCode) {
        this.code = httpCode.getCode();
        this.message = httpCode.getMessage();
    }

    public RestResponse(Object data) {
        this(HTTP_CODE.SUCCESS);
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
