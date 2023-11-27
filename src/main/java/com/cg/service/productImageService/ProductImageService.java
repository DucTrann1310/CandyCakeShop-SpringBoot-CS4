package com.cg.service.productImageService;

import com.cg.model.ProductImage;
import com.cg.repository.ProductImageRepository;
import com.cg.utils.UploadUtil;
import com.cloudinary.Cloudinary;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@AllArgsConstructor
@Transactional
public class ProductImageService {
    private final Cloudinary cloudinary;

    private final ProductImageRepository fileRepository;

    private final UploadUtil uploadUtil;

    public ProductImage saveAvatar(MultipartFile avatar) throws IOException {
        var file = new ProductImage();
        fileRepository.save(file);

        var uploadResult = cloudinary.uploader().upload(avatar.getBytes(), uploadUtil.buildImageUpLoadParams(file));

        String fileUrl = (String) uploadResult.get("secure_url");
        String fileFormat = (String) uploadResult.get("format");

        file.setFileName(file.getId() + "." + fileFormat);
        file.setFileUrl(fileUrl);
        file.setFileFolder(UploadUtil.IMAGE_UPLOAD_FOLDER);
        file.setCloudId(file.getFileFolder() + "/" + file.getId());

        fileRepository.save(file);
        return file;
    }

    public void delete(String fileUrl) {
        fileRepository.deleteProductImageByFileUrl(fileUrl);
    }

    public void deleteById(String id) {
        fileRepository.deleteById(id);
    }
}
