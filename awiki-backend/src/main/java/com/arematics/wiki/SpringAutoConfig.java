package com.arematics.wiki;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Optional;

@Configuration
@EnableJpaRepositories
@EnableCaching
@ComponentScan
@EntityScan
@EnableJpaAuditing
public class SpringAutoConfig {

    @Bean
    AuditorAware<String> auditorProvider() {
        return () -> Optional.of("System");
    }
}
