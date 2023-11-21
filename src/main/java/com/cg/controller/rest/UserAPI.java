package com.cg.controller.rest;

import com.cg.service.user.UserService;
import com.cg.service.user.request.UserSaveRequest;
import com.cg.service.user.response.UserDetailResponse;
import com.cg.service.user.response.UserListResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("api/users")
@AllArgsConstructor
public class UserAPI {
    private final UserService userService;


    @PostMapping
    public void create(@RequestBody UserSaveRequest request){
        userService.create(request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDetailResponse> findById(@PathVariable Long id){
        return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<UserListResponse>> getRooms(@PageableDefault(size = 5) Pageable pageable,
                                                           @RequestParam(defaultValue = "") String search) {
        return new ResponseEntity<>(userService.getUsers(pageable, search), HttpStatus.OK);
    }
    @PutMapping("{id}")
    public ResponseEntity<?> updateUser(@RequestBody UserSaveRequest request, @PathVariable Long id){
        userService.update(request,id);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {
        Boolean isDeleted = userService.delete(id);
        if (isDeleted) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
