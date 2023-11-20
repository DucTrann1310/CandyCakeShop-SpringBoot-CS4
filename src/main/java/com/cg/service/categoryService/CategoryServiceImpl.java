
package com.cg.service.categoryService;

import com.cg.model.Category;
import com.cg.model.dto.CategoryResDTO;
import com.cg.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoryServiceImpl implements ICategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public void save(Category category) {

    }

    @Override
    public void update(Category category) {

    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public List<CategoryResDTO> findAllCategoriesResDTO() {
        return categoryRepository.findAllCategoriesResDTO();
    }

}
