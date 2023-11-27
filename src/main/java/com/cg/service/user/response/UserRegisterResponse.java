package com.cg.service.user.response;

import lombok.*;

@Getter
@Setter
@Builder
public class UserRegisterResponse {
    private Long id;

    private String username;

    private String phone;

    private String password;



}
