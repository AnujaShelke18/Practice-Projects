package com.example.urlshortner;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api")
public class UrlController {

    private final UrlService service;

    public UrlController(UrlService service) {
        this.service = service;
    }

    @PostMapping("/shorten")
    public ShortUrl shorten(@RequestBody ShortenRequest request) {
        //  call the service with request.url() and return the result
        return service.shorten(request.url());
    }

    @GetMapping("/stats/{code}")
    public StatsResponse stats(@PathVariable String code) {
    ShortUrl url = service.getStats(code);
    return new StatsResponse(url.getOriginalUrl(), url.getShortCode(), url.getClickCount());
    }
}