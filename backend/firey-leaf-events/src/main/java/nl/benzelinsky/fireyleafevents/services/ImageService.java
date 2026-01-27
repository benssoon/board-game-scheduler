package nl.benzelinsky.fireyleafevents.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Service
public class ImageService {

    @Value("${file.upload-dir}")
    private String uploadDirectory;

    public String saveImage(MultipartFile file, String username, String basename) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot save an empty file.");
        }
        Path userDirectory = Path.of(uploadDirectory + "/" + username);
        if (!Files.exists(userDirectory)) {
            Files.createDirectories(userDirectory);
        }
        Path filePath = Path.of(userDirectory + "/" + basename + ".png");
        try {
            if (basename.equals("profilePicture")) {
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            } else {
                Files.copy(file.getInputStream(), filePath);
            }
        } catch (IOException e) {
            throw new IOException(e.getMessage());
        }

        return filePath.toString();
    }
}
