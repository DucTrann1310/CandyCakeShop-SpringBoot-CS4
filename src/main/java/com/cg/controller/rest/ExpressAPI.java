package com.cg.controller.rest;

import com.cg.service.express.ExpressService;
import com.cg.service.express.request.ExpressSaveRequest;
import com.cg.service.express.response.ExpressDetailResponse;
import com.cg.service.express.response.ExpressListResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/expresss")
@AllArgsConstructor
public class ExpressAPI {
    private final ExpressService expressService;


    @PostMapping
    public void create(@RequestBody ExpressSaveRequest request){
        expressService.create(request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpressDetailResponse> findById(@PathVariable Long id){
        return new ResponseEntity<>(expressService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<ExpressListResponse>> getExpresss(@PageableDefault(size = 5) Pageable pageable,
                                                              @RequestParam(defaultValue = "") String search) {
        return new ResponseEntity<>(expressService.getExpresss(pageable, search), HttpStatus.OK);
    }
    @PutMapping("{id}")
    public ResponseEntity<?> updateExpress(@RequestBody ExpressSaveRequest request, @PathVariable Long id){
        expressService.update(request,id);
        return ResponseEntity.ok().build();
    }
}
