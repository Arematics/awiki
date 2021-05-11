package com.arematics.wiki.config;

import com.arematics.wiki.model.MenuGroup;
import com.arematics.wiki.model.WikiEntry;
import com.arematics.wiki.model.WikiEntryData;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Configuration
public class RestRepositoryConfiguration implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(MenuGroup.class);
        config.exposeIdsFor(WikiEntry.class);
        config.exposeIdsFor(WikiEntryData.class);
    }
}
