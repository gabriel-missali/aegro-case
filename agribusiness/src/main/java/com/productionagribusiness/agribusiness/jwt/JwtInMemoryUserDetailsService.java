package com.productionagribusiness.agribusiness.jwt;

import com.productionagribusiness.agribusiness.model.User;
import com.productionagribusiness.agribusiness.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

    @Autowired
    UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userService.getUserByEmail(email);

        return new JwtUserDetails(user.getId(), user.getName(), user.getEmail(), user.getPassword());
    }

    public JwtUserDetails getUserDetails(String tokenJwt){
        String username = jwtTokenUtil.getUsernameFromToken(tokenJwt.split(" ")[1]);
        return (JwtUserDetails) this.loadUserByUsername(username);
    }

}
