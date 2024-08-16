package com.redditclone.postit.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // when used with @Bean, uses CGLIB proxying to create singleton beans managed by Spring
@RequiredArgsConstructor
public class SecurityConfig {
    @Bean // use instead of @Component when we need more than simple instantiation
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.csrf(AbstractHttpConfigurer::disable)
                // csrf attacks occur when using sessions and cookies to authenticate those sessions
                // REST APIs are stateless by definition + we are using JWT for authorisation
                .authorizeHttpRequests(authorize -> authorize
                        // allow all incoming requests to the backend API (that match the patterns)
                        .requestMatchers("/api/auth/**")
                        .permitAll()
                        // authenticate all other requests, then permit
                        .anyRequest()
                        .authenticated())
                .build();
    }

    @Bean // can also use for libraries not compatible with @Component - e.g. 3rd party libraries
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
