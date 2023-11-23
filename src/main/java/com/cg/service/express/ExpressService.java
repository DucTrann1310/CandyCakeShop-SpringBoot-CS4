package com.cg.service.express;

import com.cg.model.Express;

import com.cg.repository.ExpressRepository;
import com.cg.service.express.request.ExpressSaveRequest;
import com.cg.service.express.response.ExpressDetailResponse;
import com.cg.service.express.response.ExpressListResponse;

import com.cg.utils.AppUtil;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ExpressService {
    private final ExpressRepository expressRepository;

    public void create(ExpressSaveRequest request){
        var express = AppUtil.mapper.map(request, Express.class);
        expressRepository.save(express);
    }

    public ExpressDetailResponse findById(Long id){
        var express = expressRepository.findById(id).orElse(new Express());
        var result = AppUtil.mapper.map(express, ExpressDetailResponse.class);
        return result;
    }

    public Page<ExpressListResponse> getExpresss(Pageable pageable, String search){
        search = "%" + search + "%";
        return expressRepository.searchEverything(search ,pageable).map(e -> {
            var result = AppUtil.mapper.map(e, ExpressListResponse.class);
            return result;
        });
    }

    public void update(ExpressSaveRequest request, Long id){
        var expressDb = expressRepository.findById(id).orElse(new Express());
        AppUtil.mapper.map(request,expressDb);
        expressRepository.save(expressDb);
    }
    public Boolean delete(Long id) {
        expressRepository.deleteById(id);
        return true;
    }
}
