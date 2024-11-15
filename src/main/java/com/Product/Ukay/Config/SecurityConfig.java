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
                .csrf(csrf -> csrf.disable()) // Disable CSRF for testing (not recommended for production)
                
                
                .authorizeRequests(authorize -> authorize
                        .requestMatchers("/api/register/save","error").permitAll()
                        .requestMatchers("/api/register/login","error").permitAll()
                        .requestMatchers("/api/register/health").permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}
