package com.cg.service.user.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserRegisterRequest {

    private String username;

    private String phone;

    private String password;



}
