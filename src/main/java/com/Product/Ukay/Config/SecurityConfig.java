package com.Product.Ukay.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
<<<<<<< HEAD
                .csrf(csrf -> csrf.disable()) 
                
                
                .authorizeRequests(authorize -> authorize
                        .requestMatchers("/api/register/save","error").permitAll()
                        .requestMatchers("/api/register/login","error").permitAll()
                        .requestMatchers("/api/register/health").permitAll()
                        .anyRequest().authenticated()
                );
=======
            .cors().and()  // Enables CORS
            .csrf().disable()  // Disable CSRF for testing (not recommended for production)
            .authorizeRequests(authorize -> authorize
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()  // Allow OPTIONS requests for preflight
                .requestMatchers("/api/register/save", "/api/register/login", "/api/register/health", "/error").permitAll()
                .requestMatchers("/api/sell/get","/api/sell/post", "/api/sell/update/**", "/api/sell/delete/**").permitAll()

                .anyRequest().authenticated()  // Require authentication for other requests
            );
>>>>>>> ddda8b566b4d4c8b5e49f935ac2c4133e7efea48

        return http.build();
    }
}
