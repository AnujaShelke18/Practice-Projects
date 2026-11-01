package com.example.urlshortner;

public record StatsResponse(String originalUrl, String shortCode, int clickCount) {
}
