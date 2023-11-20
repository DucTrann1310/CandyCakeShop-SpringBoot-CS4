package com.cg.repository;


import com.cg.model.User;

import com.cg.model.dto.UserResDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT  NEW com.cg.model.dto.UserResDTO ( " +
            "u.id, " +
            "u.name, " +
            "u.phone, " +
            "u.username," +
            "u.password, " +
            "u.address," +
            "u.dob, " +
            "u.gender, " +
            "u.role " +
            ")" +
            "FROM User as u " +
            "ORDER BY u.id DESC "
    )
    List<UserResDTO> findAllUserResDTO();
}
