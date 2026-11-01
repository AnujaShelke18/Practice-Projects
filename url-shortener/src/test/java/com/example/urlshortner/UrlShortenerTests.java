package com.example.urlshortner;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(properties = "spring.datasource.url=jdbc:h2:mem:testdb")
@AutoConfigureMockMvc
class UrlShortenerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ShortUrlRepository repository;

    @Test
    void shortenValidUrl() throws Exception {
        mockMvc.perform(post("/api/shorten")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"url\":\"https://www.google.com\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.originalUrl").value("https://www.google.com"))
            .andExpect(jsonPath("$.clickCount").value(0));
    }

    @Test
    void shortenInvalidUrlReturns400() throws Exception {
        //  same request as above, but with the url "hello"
        // expect status().isBadRequest()
        mockMvc.perform(post("/api/shorten")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"url\":\"hello\"}"))
            .andExpect(status().isBadRequest());        
    }

    @Test
    void redirectGoesToOriginalUrl() throws Exception {
        repository.save(new ShortUrl("https://www.google.com", "abc123"));
        //  perform get("/abc123")
        // expect status().isFound()
        // expect header().string("Location", "https://www.google.com")
        mockMvc.perform(get("/abc123"))
            .andExpect(status().isFound())
            .andExpect(header().string("Location", "https://www.google.com"));
        assertEquals(1, repository.findByShortCode("abc123").get().getClickCount());
    }

    @Test
    void unknownCodeReturns404() throws Exception {
        //  perform get("/zzzzzz") and expect status().isNotFound()
        mockMvc.perform(get("/zzzzzz"))
            .andExpect(status().isNotFound());   
    }
    
}

