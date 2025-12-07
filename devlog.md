# Devlog - Bugs, Notes and Lessons

## Swagger UI 405 / CORS Bug – Summary

While migrating the PostIt backend (Spring Boot 3 + springdoc-openapi + JWT security) to PostgreSQL, Swagger UI consistently failed, even though the OpenAPI JSON endpoint worked.

- `GET /v3/api-docs` → 200 OK (OpenAPI JSON returned).
- `GET /swagger-ui.html` → 302 redirect to `/swagger-ui/index.html`, then a Whitelabel error with `405 Method Not Allowed`.
- `GET /favicon.ico` also returned 405.

Logs showed `/swagger-ui.html` mapped correctly to the springdoc redirect handler, but `/swagger-ui/index.html` hit `HttpRequestMethodNotSupportedException: Request method 'GET' is not supported`.

After simplifying the setup (keeping only `springdoc-openapi-starter-webmvc-ui`, removing `@EnableWebMvc`, and temporarily allowing all traffic in Spring Security), the problem persisted. That pointed to a controller mapping issue rather than a Swagger or Security configuration problem.

The root cause was a custom CORS controller:

```java
@RestController
public class CorsController {
  @RequestMapping(value = "/**", method = RequestMethod.OPTIONS)
  public ResponseEntity<?> handle() {
    return ResponseEntity.ok().build();
  }
}
```

This catch-all `"/**"` mapping intercepted requests for static resources like `/swagger-ui/index.html` and `/favicon.ico`. Because it only allowed `OPTIONS`, any GET request resulted in 405.

**Fix:**

- Deleted `CorsController` and relied on `WebConfig#addCorsMappings` for CORS.
- Scoped security to `/api/**` so Swagger endpoints remain public.

After this change, `/swagger-ui.html` and `/swagger-ui/index.html` both loaded correctly.
