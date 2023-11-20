package com.cg.model.dto;

import com.cg.model.Role;
import com.cg.model.enums.EGender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class UserResDTO {
    private Long id;
    private String name;
    private String phone;
    private String username;
    private String password;
    private String address;
    private Date dob;
    private EGender gender;
    private RoleResDTO role;

    public UserResDTO(Long id, String name, String phone, String username, String password, String address, Date dob, EGender gender, Role role) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.username = username;
        this.password = password;
        this.address = address;
        this.dob = dob;
        this.gender = gender;
        this.role = role.toRoleResDTO();
    }
}
