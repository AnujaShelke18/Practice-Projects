package com.example.urlshortner;

import java.net.URI;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RedirectController {

    private final UrlService service;

    public RedirectController(UrlService service) {
        this.service = service;
    }

    @GetMapping("/{code:[a-zA-Z0-9]{6}}")
    public ResponseEntity<Void> redirect(@PathVariable String code) {
        ShortUrl url = service.resolve(code);
        //  return a 302 redirect to url.getOriginalUrl()
        // pieces: ResponseEntity.status(HttpStatus.FOUND) -> .location(URI.create(...)) -> .build()
        return ResponseEntity.status(HttpStatus.FOUND)
            .location(URI.create(url.getOriginalUrl()))
            .build();
        
    }
}