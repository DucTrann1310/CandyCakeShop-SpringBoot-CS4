package com.cg.service.cartService;

import com.cg.model.Cart;
import com.cg.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartService implements ICartService {

    private final CartRepository cartRepository;

    @Autowired
    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

//    public BigDecimal getTotalCartByMonth(int year, int month) {
//        YearMonth yearMonth = YearMonth.of(year, month);
//        Date startDate = Date.from(yearMonth.atDay(1).atStartOfDay().toInstant());
//        Date endDate = Date.from(yearMonth.atEndOfMonth().atStartOfDay().toInstant());
//
//        List<Cart> carts = cartRepository.findByDate(startDate, endDate);
//
//        BigDecimal total = BigDecimal.ZERO;
//        for (Cart cart : carts) {
//            total = total.add(BigDecimal.valueOf(cart.getPrice()));
//        }
//
//        return total;
//    }


    @Override
    public List<Cart> findAll() {
        return cartRepository.findAll();
    }

    @Override
    public Optional<Cart> findById(Long id) {
        return cartRepository.findById(id);
    }

    @Override
    public void save(Cart cart) {
        cartRepository.save(cart);
    }

    @Override
    public void update(Cart cart) {
    }

    @Override
    public void deleteById(Long id) {

    }



}
