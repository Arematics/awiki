package com.arematics.wiki.repository;

import com.arematics.wiki.model.SmallEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "entries", path = "entries")
public interface SmallEntryRepository extends JpaRepository<SmallEntry, Long> {
    List<SmallEntry> findAllByTitleContains(@Param("title") String title);
    List<SmallEntry> findAllByGroup_Id(@Param("id") Long id);
    boolean existsByTitleAndGroup_Id(@Param("title") String title, @Param("id") Long id);
}
