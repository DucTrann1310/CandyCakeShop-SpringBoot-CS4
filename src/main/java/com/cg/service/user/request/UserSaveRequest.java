package com.cg.service.user.request;

import com.cg.service.dto.request.SelectOptionRequest;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
public class UserSaveRequest {
    private String name;
    private String phone;
    private String username;
    private String password;
    private String address;
    private String dob;

    private SelectOptionRequest role;

    private SelectOptionRequest gender;
}
