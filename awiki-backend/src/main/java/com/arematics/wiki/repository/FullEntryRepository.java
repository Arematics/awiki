package com.arematics.wiki.repository;

import com.arematics.wiki.model.FullEntry;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FullEntryRepository extends JpaRepository<FullEntry, Long> {
    List<FullEntry> findAllByContentContainsAndPublishedIsTrue(@Param("like") String like);
    List<FullEntry> findAllByTitleContainsAndPublishedIsTrue(@Param("title") String title);
    List<FullEntry> findAllByPublishedIsTrue(Pageable pageable);
}
