package com.arematics.wiki.repository;

import com.arematics.wiki.model.MenuGroup;
import com.arematics.wiki.model.WikiEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "entries", path = "entries")
public interface WikiEntryRepository extends JpaRepository<WikiEntry, Long> {
    List<WikiEntry> findAllByTitle(String title);
}
