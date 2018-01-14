package code.artist.cms.core.controller.systam;

import code.artist.common.constants.Constants;
import code.artist.common.result.RestResponse;
import code.artist.core.facade.system.IUserService;
import code.artist.core.model.system.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private IUserService userService;

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public RestResponse login(String username, String password) {
        System.out.println(username + ":" + password);
        User loginUser = userService.login(username, password);
        if (loginUser != null) {
            return new RestResponse<>(Constants.Http.SUCCESS, null, loginUser);
        } else {
            return null;
        }
    }

}
