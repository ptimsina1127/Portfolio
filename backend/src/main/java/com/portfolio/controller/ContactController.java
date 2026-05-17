package com.portfolio.controller;

import com.portfolio.model.ContactMessage;
import com.portfolio.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> sendMessage(@RequestBody ContactMessage message) {
        contactService.saveMessage(message);
        return ResponseEntity.ok(Map.of("message", "Message sent successfully"));
    }
}
