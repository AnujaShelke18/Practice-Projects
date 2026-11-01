package com.example.urlshortner;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShortUrlRepository extends JpaRepository<ShortUrl, Long> {

    //  declare a method that finds a ShortUrl by its shortCode
    //hint: the name must start with findBy and end with the field name
    Optional<ShortUrl> findByShortCode(String shortCode);
}