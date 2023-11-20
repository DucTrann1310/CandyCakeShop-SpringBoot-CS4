package com.cg.model;

import com.cg.model.enums.EGender;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phone;
    private String username;
    private String password;
    private String address;
    private Date dob;

    @Enumerated(value = EnumType.STRING)
    private EGender gender;

     @OneToOne
    private Role role;


}
