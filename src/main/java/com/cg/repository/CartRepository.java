package com.cg.repository;

import com.cg.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
//    @Query( "SELECT sum(c.price) FROM carts c " +
//            "WHERE " +
//            "month(u.oderDate) = : catrId
//    )

    @Query(value = "SELECT SUM(c.price) FROM carts As c WHERE month(c.oderDate) = :date", nativeQuery = true)
    BigDecimal getMonth(@Param("date") Long date);


    List<Cart> findByDate(Date startDate, Date endDate);
}
