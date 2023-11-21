package com.cg.repository;


import com.cg.model.User;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    @Query(value = "SELECT u FROM User u " +
            "WHERE " +
            "u.name LIKE :search OR " +
            "u.username LIKE :search"
            )
    Page<User> searchEverything(String search, Pageable pageable);
}
