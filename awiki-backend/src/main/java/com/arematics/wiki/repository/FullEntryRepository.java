package com.arematics.wiki.repository;

import com.arematics.wiki.model.FullEntry;
import com.arematics.wiki.model.SmallEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "fullentry", path = "fullentry")
public interface FullEntryRepository extends JpaRepository<FullEntry, Long> {
    List<FullEntry> findAllByContentContains(@Param("like") String like);
    List<FullEntry> findAllByTitleContains(String title);
}
