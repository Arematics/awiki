package com.arematics.wiki.repository;

import com.arematics.wiki.model.SmallEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SmallEntryRepository extends JpaRepository<SmallEntry, Long> {
    List<SmallEntry> findAllByGroup_Id(@Param("id") Long id);
    List<SmallEntry> findAllByGroup_IdAndPublishedIsTrue(@Param("id") Long id);
    boolean existsByTitleAndGroup_Id(@Param("title") String title, @Param("id") Long id);
}
