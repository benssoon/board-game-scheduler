package nl.benzelinsky.fireyleafevents.controllers;

import nl.benzelinsky.fireyleafevents.services.ImageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;

@RestController
@RequestMapping("/images")
public class ImageController {

    private final ImageService imageService;
    @Value("${file.upload-dir}")
    private String uploadDirectory;


    public ImageController(ImageService service) {
        this.imageService = service;
    }

    // Upload profile picture
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("profilePicture") MultipartFile uploadedFile) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        String basename = "profilePicture";
        String filename;
        try {
            filename = this.imageService.saveImage(uploadedFile, username, basename);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok().body(filename);
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path filePath = Path.of(uploadDirectory).resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_PNG)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
