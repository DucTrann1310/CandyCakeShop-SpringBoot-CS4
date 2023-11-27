package com.cg.service.UploadService;

import com.cloudinary.Cloudinary;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@NoArgsConstructor
public class UploadService {
    @Autowired
    private Cloudinary cloudinary;

    public Map uploadImage(MultipartFile multipartFile, Map options) throws IOException {
        return cloudinary.uploader().upload(multipartFile.getBytes(), options);
    }
}
