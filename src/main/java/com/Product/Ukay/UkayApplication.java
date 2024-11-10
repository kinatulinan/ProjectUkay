package com.Product.Ukay;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.Product.Ukay")
public class UkayApplication {

	public static void main(String[] args) {
		SpringApplication.run(UkayApplication.class, args);
	}

}
