package com.cg.service.user.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
public class UserDetailResponse {
    private Long id;
    private String name;
    private String phone;
    private String username;
    private String password;
    private String address;
    private Date dob;

    private Long roleId;

    private Long genderId;
}
