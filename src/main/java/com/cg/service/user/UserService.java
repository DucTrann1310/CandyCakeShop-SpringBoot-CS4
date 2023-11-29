package com.cg.service.user;


import com.cg.exception.ResourceNotFoundException;
import com.cg.model.Gender;
import com.cg.model.Role;
import com.cg.model.User;
import com.cg.repository.UserRepository;
import com.cg.service.dto.response.SelectOptionResponse;
import com.cg.service.user.request.UserRegisterRequest;
import com.cg.service.user.request.UserSaveRequest;
import com.cg.service.user.response.UserDetailResponse;
import com.cg.service.user.response.UserListResponse;
import com.cg.service.user.response.UserRegisterResponse;
import com.cg.utils.AppMessage;
import com.cg.utils.AppUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@AllArgsConstructor
@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public List<SelectOptionResponse> findAll() {
        return userRepository.findAll()
                .stream().map(user -> new SelectOptionResponse(user.getId()
                        .toString(), user.getName())).collect(Collectors.toList());
    }

    public void create(UserSaveRequest request){
        var user = AppUtil.mapper.map(request, User.class);
        user.setRole(new Role(2L, "USER"));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public UserDetailResponse findById(Long id){
        var user = userRepository.findById(id).orElse(new User());
        var result = AppUtil.mapper.map(user, UserDetailResponse.class);
        result.setRoleId(user.getRole().getId());
        result.setGenderId(user.getGender().getId());

        return result;
    }

    public Page<UserListResponse> getUsers(Pageable pageable, String search){
        search = "%" + search + "%";
        return userRepository.searchEverything(search ,pageable).map(e -> {
            var result = AppUtil.mapper.map(e, UserListResponse.class);
            result.setRole(e.getRole().getName());
            result.setGender(e.getGender().getName());

            return result;
        });
    }


    public void update(UserSaveRequest request, Long id){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        var userDb = userRepository.findById(id).orElse(new User());

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(request.getPassword());
            userDb.setPassword(encodedPassword);
        }
        userDb.setRole(new Role());
        userDb.setGender(new Gender());

        AppUtil.mapper.map(request,userDb);

        userRepository.save(userDb);
    }
//public void update(UserSaveRequest request, Long id) {
//    var userDb = userRepository.findById(id).orElse(new User());
//
//
//
//    // Cập nhật các thông tin khác của người dùng
//    userDb.setRole(new Role());
//    userDb.setGender(new Gender());
//    AppUtil.mapper.map(request, userDb);
//
//    if (request.getPassword() != null && !request.getPassword().isEmpty()) {
//        String encodedPassword = passwordEncoder.encode(request.getPassword());
//        userDb.setPassword(encodedPassword);
//    }
//    // Cập nhật mật khẩu đã sửa đổi vào cơ sở dữ liệu
//    userRepository.save(userDb);
//}


    public Boolean delete(Long id) {
        userRepository.deleteById(id);
        return true;
    }

//    public List<UserRegisterResponse> getAllUserRegister() {
//        return userRepository.findAll()
//                .stream()
//                .map(service -> UserRegisterResponse.builder()
//                        .id(service.getId())
//                        .username(service.getUsername())
//                        .password(service.getPassword())
//                        .build())
//                .collect(Collectors.toList());
//    }
//
//    public void createRegister(UserRegisterRequest request){
//        var user = AppUtil.mapper.map(request, User.class);
//        user.setRole(new Role(2L, "USER"));
//        userRepository.save(user);
//    }

    public Optional<User> findByNameIgnoreCaseOrPhone(String loginName) {
        return Optional.ofNullable(userRepository.findByUsernameIgnoreCaseOrPhone(loginName, loginName)
                .orElseThrow(() -> new ResourceNotFoundException
                        (String.format(AppMessage.ID_NOT_FOUND, "User"))));
    }
}
