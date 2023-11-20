package com.cg.service.userService;


import com.cg.model.User;

import com.cg.model.dto.UserResDTO;
import com.cg.service.IGeneralService;

import java.util.List;

public interface IUserService extends IGeneralService<User, Long> {
    List<UserResDTO> findAllUserResDTO();

}
