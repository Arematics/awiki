package com.arematics.wiki.repository;

import com.arematics.wiki.model.WikiEntry;
import com.arematics.wiki.model.WikiEntryData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "entrydata", path = "entrydata")
public interface WikiEntryDataRepository extends JpaRepository<WikiEntryData, Long> {
    List<WikiEntryData> findAllByContentContains(@Param("like") String like);
}
