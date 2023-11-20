package com.cg.service.userService;

import com.cg.model.User;
import com.cg.model.dto.UserResDTO;
import com.cg.repository.UserRepository;
import com.cg.service.productService.IProductService;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements IUserService {


    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public void update(User user) {

    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public List<UserResDTO> findAllUserResDTO() {
        return userRepository.findAllUserResDTO();
    }
}
