package com.arematics.wiki.repository;

import com.arematics.wiki.model.WikiEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface WikiEntryRepository extends JpaRepository<WikiEntry, Long>, JpaSpecificationExecutor<WikiEntry> {
    Optional<WikiEntry> findByName(String name);
    List<WikiEntry> findAllByParent(long id);
    @Query(value = "SELECT * FROM wiki.wiki_entry entries WHERE MATCH(entries.content) AGAINST(?1 IN BOOLEAN MODE)",
            nativeQuery = true)
    List<WikiEntry> searchByMatch(String match);
}
