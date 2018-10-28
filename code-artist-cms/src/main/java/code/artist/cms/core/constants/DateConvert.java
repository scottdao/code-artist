package code.artist.cms.core.constants;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Controller;

import java.util.Date;

/**
 * SpringMVC绑定
 *
 * @author 艾江南
 */
@Controller
public class DateConvert implements Converter<String, Date> {

    @Override
    public Date convert(String source) {
        Date date = new Date();
        long l = Long.parseLong(source);
        date.setTime(l);
        return date;
    }
}
