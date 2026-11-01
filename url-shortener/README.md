# URL Shortener

A small full-stack URL shortener built with Spring Boot. Paste a long link, get a short one, and track how many times it has been clicked.

<!-- Add a screenshot of the page with a short link on it: -->
[screenshot](screenshot.png)

## Features

- Shorten any `http://` or `https://` URL into a random 6-character code
- Redirect from the short link to the original URL (HTTP 302)
- Click counter that goes up on every redirect
- Stats endpoint to see a link's click count without counting as a click
- Input validation: blank, malformed, or non-http(s) URLs are rejected with a 400 error
- Unknown short codes return a 404
- Links are saved to disk, so they survive an app restart
- Simple web page to use it from the browser

## Tech Stack

- Java 17
- Spring Boot (Spring Web, Spring Data JPA)
- H2 database in file mode
- HTML and vanilla JavaScript (`fetch`) for the front end

## Getting Started

1. Clone the repository
2. Open the project and run `UrlshortnerApplication`, or from the project folder run:

   ```
   ./mvnw spring-boot:run
   ```

3. Open http://localhost:8080 in your browser

## API

| Method | Endpoint            | Description                                                      |
|--------|---------------------|------------------------------------------------------------------|
| POST   | `/api/shorten`      | Takes `{"url": "https://example.com"}` and returns the saved link with its `shortCode` |
| GET    | `/{code}`           | Redirects to the original URL and adds one to the click count    |
| GET    | `/api/stats/{code}` | Returns `originalUrl`, `shortCode` and `clickCount`              |

### Example

```
POST /api/shorten
{ "url": "https://www.google.com" }

→ { "id": 1, "originalUrl": "https://www.google.com", "shortCode": "aB3xY9", "clickCount": 0 }
```

Then open `http://localhost:8080/aB3xY9` to be redirected, and `http://localhost:8080/api/stats/aB3xY9` to see the click count.

### Errors

| Status | When                                                       |
|--------|------------------------------------------------------------|
| 400    | The URL is missing, blank, malformed, or not http/https    |
| 404    | The short code doesn't exist                               |

## Project Structure

```
ShortUrl                entity: the database table (id, originalUrl, shortCode, clickCount)
ShortUrlRepository      Spring Data JPA repository with findByShortCode
UrlService              business logic: code generation, validation, click counting
UrlController           /api/shorten and /api/stats/{code}
RedirectController      /{code} redirect
ShortenRequest          request body record
StatsResponse           stats response record
static/index.html       the web page
```

## How It Works

1. `POST /api/shorten` validates the URL, generates a random 6-character code from letters and digits, checks the database to make sure the code isn't already taken, and saves the new row.
2. When someone opens `/{code}`, the app looks the code up, adds one to `clickCount`, saves it, and replies with a 302 status and a `Location` header. The browser follows that header to the original URL.
3. The redirect route only matches 6-character alphanumeric codes, so it doesn't swallow other paths like the home page.

## What I Learned

- How a redirect works: a 302 status plus a `Location` header
- Splitting an app into controller, service, and repository layers
- Letting Spring Data JPA generate queries from method names like `findByShortCode`
- Returning proper HTTP status codes (400 and 404) with `ResponseStatusException`
- Keeping reads and writes separate: the stats endpoint must not change the click count
- Why a catch-all route like `/{code}` can block other routes, and how to restrict it with a regex

## Ideas for Later

- Automated tests with MockMvc
- Switch to MySQL or PostgreSQL
- Custom aliases and link expiry