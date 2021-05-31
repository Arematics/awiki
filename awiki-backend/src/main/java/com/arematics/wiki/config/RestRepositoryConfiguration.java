package com.arematics.wiki.config;

import com.arematics.wiki.model.MenuGroup;
import com.arematics.wiki.model.SmallEntry;
import com.arematics.wiki.model.FullEntry;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class RestRepositoryConfiguration implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(MenuGroup.class);
        config.exposeIdsFor(SmallEntry.class);
        config.exposeIdsFor(FullEntry.class);
    }
}
