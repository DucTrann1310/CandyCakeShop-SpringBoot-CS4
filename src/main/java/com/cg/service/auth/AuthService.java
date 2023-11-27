package com.cg.service.auth;



import com.cg.model.Role;
import com.cg.model.User;
import com.cg.repository.UserRepository;
import com.cg.service.auth.request.RegisterRequest;
import com.cg.utils.AppUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;

@Service
@AllArgsConstructor
public class AuthService implements UserDetailsService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public void register(RegisterRequest request){
        var user = AppUtil.mapper.map(request, User.class);
        user.setRole(new Role(2L, "USER"));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public boolean checkUsernameOrPhone(RegisterRequest request, BindingResult result){
        boolean check = false;
        if(userRepository.existsByUsername(request.getUsername())){
            result.rejectValue("name", "name", "Tên người dùng đã tồn tại");
            check = true;
        }
        if(userRepository.existsByPhone(request.getPhone())){
            result.rejectValue("phone", "phone", "Số điện thoại đã tồn tại");
            check = true;
        }
        return check;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameIgnoreCaseOrPhone(username, username)
                .orElseThrow(() -> new UsernameNotFoundException("User not Exist") );

        var role = new ArrayList<SimpleGrantedAuthority>();
        role.add(new SimpleGrantedAuthority(user.getRole().toString()));

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), role);
    }
}