package code.artist.cms.core.auth;

import code.artist.core.facade.system.IUserService;
import code.artist.core.model.system.User;
import code.artist.utils.common.DesUtil;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Shiro自定义Realm
 *
 * @author 艾江南
 */
public class LoginRealm extends AuthorizingRealm {

    final private Logger logger = LoggerFactory.getLogger(LoginRealm.class);
    @Autowired
    private IUserService userService;

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        logger.info("======用户登陆认证======");
        String username = authenticationToken.getPrincipal().toString();
        User user = userService.login(username);
        if (user != null) {
            String password = user.getPassword();
            try {
                user.setPassword(DesUtil.decrypt(password, DesUtil.getKey()));
            } catch (Exception e) {
                e.printStackTrace();
            }
            return new SimpleAuthenticationInfo(user, password, user.getRealname());
        }
        return null;
    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        logger.info("======用户授权认证======");
        return new SimpleAuthorizationInfo();
    }
}
