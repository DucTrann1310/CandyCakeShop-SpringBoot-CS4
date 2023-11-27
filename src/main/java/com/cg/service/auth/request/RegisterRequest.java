package com.cg.service.auth.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegisterRequest {

    private String username;

    private String phone;

    private String password;



}
