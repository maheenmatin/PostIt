package com.redditclone.postit.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {
    //TODO: add personal portfolio website link here

    @Bean
    public OpenAPI postitAPI() {
        return new OpenAPI()
            .info(new Info().title("PostIt - Reddit Clone")
                .description("REST API Documentation")
                .version("v1.0")
                .license(new License().name("Apache License 2.0")));
    }
}
