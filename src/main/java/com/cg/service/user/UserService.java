package com.cg.service.user;


import com.cg.model.Gender;
import com.cg.model.Role;
import com.cg.model.User;
import com.cg.repository.UserRepository;
import com.cg.service.user.request.UserSaveRequest;
import com.cg.service.user.response.UserDetailResponse;
import com.cg.service.user.response.UserListResponse;
import com.cg.utils.AppUtil;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;



@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public void create(UserSaveRequest request){
        var user = AppUtil.mapper.map(request, User.class);
        user.setRole(new Role(2L, "USER"));
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
        var userDb = userRepository.findById(id).orElse(new User());
        userDb.setRole(new Role());
        userDb.setGender(new Gender());
        AppUtil.mapper.map(request,userDb);




        userRepository.save(userDb);
    }
    public Boolean delete(Long id) {
        userRepository.deleteById(id);
        return true;
    }
}
