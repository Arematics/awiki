package com.arematics.wiki.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${spring.security.user.name}")
    private String username;

    @Value("${spring.security.user.password}")
    private String password;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        if(!username.equals("null")) {
            http.csrf().disable()
                    .authorizeRequests()
                    .antMatchers(HttpMethod.POST, "/**").hasRole("ADMIN")
                    .antMatchers(HttpMethod.PUT, "/**").hasRole("ADMIN")
                    .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                    .antMatchers(HttpMethod.GET, "/**").hasRole("ADMIN")
                    .antMatchers("/**").permitAll()
                    .and()
                    .httpBasic()
                    .and()
                    .formLogin().disable();
        }else{
            http.csrf().disable()
                    .authorizeRequests()
                    .antMatchers("/**").permitAll()
                    .and()
                    .httpBasic()
                    .and()
                    .formLogin().disable();
        }
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        if(!username.equals("null")) {
            auth.inMemoryAuthentication()
                    .withUser(username)
                    .password("{noop}" + password)
                    .roles("ADMIN");
        }
    }
}
