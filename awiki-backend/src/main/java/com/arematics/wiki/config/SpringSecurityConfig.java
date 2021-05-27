package com.arematics.wiki.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/**")
                    .permitAll()
                .antMatchers(HttpMethod.PUT, "/**")
                    .hasAuthority("SCOPE_write")
                .antMatchers(HttpMethod.POST, "/**")
                    .hasAuthority("SCOPE_write")
                .antMatchers(HttpMethod.DELETE, "/**")
                    .hasAuthority("SCOPE_write")
                .anyRequest()
                .authenticated()
                .and()
                .oauth2ResourceServer()
                .jwt();
    }
}
