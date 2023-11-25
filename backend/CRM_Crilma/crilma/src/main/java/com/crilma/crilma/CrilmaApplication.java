package com.crilma.crilma;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class CrilmaApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrilmaApplication.class, args);
		System.out.println(
				"//#/////#//////##Server started, Welcome to Customer Relationship Management.##//////////#//////#//");
	}

	@RequestMapping
	public String helloname() {
		return "Hello Prathamesh Surve. This is your spring web application. Welcome to Customer Relationship Management System.";
	}

}
