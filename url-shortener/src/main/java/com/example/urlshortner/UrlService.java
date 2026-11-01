package com.example.urlshortner;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Random;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;



@Service
public class UrlService {

    private static final String CHARS =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    private final ShortUrlRepository repository;
    private final Random random = new Random();

    public UrlService(ShortUrlRepository repository) {
        this.repository = repository;
    }

    private String generateCode() {
        //  build a 6-character string by picking random characters from CHARS
        // hint: random.nextInt(CHARS.length()) gives a random index, and StringBuilder helps
        StringBuilder code = new StringBuilder(6);
        for (int i = 0; i < 6; i++) {
            code.append(CHARS.charAt(random.nextInt(CHARS.length())));
        }
        return code.toString();
    }

    public ShortUrl shorten(String originalUrl) {
        validateUrl(originalUrl);
        //  generate a code; while repository.findByShortCode(code).isPresent(), generate a new one
        String code = generateCode();
        while (repository.findByShortCode(code).isPresent()) {
            code = generateCode();
        }
        //  create a new ShortUrl(originalUrl, code), save it with repository.save(...), and return the result
        return repository.save(new ShortUrl(originalUrl, code));
    }

    public ShortUrl resolve(String code) {
    // look the code up with repository.findByShortCode(code)
    ShortUrl shortUrl = repository.findByShortCode(code)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Short URL not found"));
    
    // if it's empty, throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Short URL not found")
    // hint: orElseThrow(() -> new ResponseStatusException(...)) does this in one go
    //  increase clickCount by 1, save it with repository.save(...), and return it
    shortUrl.setClickCount(shortUrl.getClickCount() + 1);
    return repository.save(shortUrl);
}

public ShortUrl getStats(String code) {
    //  find by code and throw the same 404 if it's missing, but do NOT change clickCount
    ShortUrl url = repository.findByShortCode(code)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Short URL not found"));

    return url;
}

private void validateUrl(String url) {
    if (url == null || url.isBlank()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "URL is required");
    }

    try {
        URI uri = new URI(url);
        String scheme = uri.getScheme();
        if (scheme == null || (!scheme.equals("http") && !scheme.equals("https"))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "URL must start with http:// or https://");
        }
    } catch (URISyntaxException e) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid URL");
    }
}
}