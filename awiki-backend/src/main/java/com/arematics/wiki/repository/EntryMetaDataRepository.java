package com.arematics.wiki.repository;

import com.arematics.wiki.model.EntryMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "metadata", path = "metadata")
public interface EntryMetaDataRepository extends JpaRepository<EntryMetadata, Long> {
    List<EntryMetadata> findAllByEntryId(@Param("entryId") Long id);
    Optional<EntryMetadata> findByEntryIdAndName(@Param("entryId") Long id, @Param("name") String name);
}
