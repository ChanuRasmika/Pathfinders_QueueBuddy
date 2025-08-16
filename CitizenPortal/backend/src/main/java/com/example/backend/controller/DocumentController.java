package com.example.backend.controller;

import com.example.backend.dto.UploadResponse;
import com.example.backend.entity.SubmittedDocument;
import com.example.backend.service.DocumentService;
import com.example.backend.util.CustomUserDetails;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/submissions")
@PreAuthorize("hasRole('CITIZEN')")
public class DocumentController {
    private final DocumentService service;
    public DocumentController(DocumentService service) { this.service = service; }

    @PostMapping
    public UploadResponse upload(@RequestParam("departmentId") Integer departmentId,
                                 @RequestParam("file") MultipartFile file,
                                 Authentication auth) throws IOException {
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        Integer userId = userDetails.getUser().getUserId();
        return service.upload(userId, departmentId, file);
    }

    @GetMapping("/{submittedId}/download")
    public void download(@PathVariable Integer submittedId,
                         @AuthenticationPrincipal CustomUserDetails userDetails,
                         HttpServletResponse response) throws IOException {
        SubmittedDocument doc = service.getForDownload(submittedId, userDetails.getUser().getUserId());

        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"document\"");
        response.setContentType("application/octet-stream");
        response.getOutputStream().write(doc.getDocumentPdf());
        response.flushBuffer();
    }

}
