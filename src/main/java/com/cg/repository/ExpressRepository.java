package com.cg.repository;

import com.cg.model.Express;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ExpressRepository extends JpaRepository<Express, Long> {

    @Query(value = "SELECT e FROM Express e " +
            "WHERE " +
            "e.name LIKE :search"
    )
    Page<Express> searchEverything(String search, Pageable pageable);
}

