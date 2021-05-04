package com.productionagribusiness.agribusiness.jwt.resource;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


@Getter
@Setter
public class JwtTokenRequest implements Serializable {

    private static final long serialVersionUID = -5616176897013108345L;

    private Integer id;
    private String email;
    private String password;
    private String name;

    public JwtTokenRequest() {
        super();
    }

    public JwtTokenRequest(Integer id, String email, String password, String name) {
        this.setId(id);
        this.setEmail(email);
        this.setPassword(password);
        this.setName(name);
    }
}