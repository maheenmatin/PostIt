package com.redditclone.postit;

import com.redditclone.postit.configuration.OpenAPIConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@Import(OpenAPIConfig.class)
public class PostItApplication {
	public static void main(String[] args) {
		SpringApplication.run(PostItApplication.class, args);
	}
}

//documentation link -> http://localhost:8080/swagger-ui/index.html
