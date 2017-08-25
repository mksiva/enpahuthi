package com.mksiva;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * Created by Siva on 17.8.17.
 */

@SpringBootApplication
public class SeyaliApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(SeyaliApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(applicationClass);
    }

    private static Class<SeyaliApplication> applicationClass = SeyaliApplication.class;

}
