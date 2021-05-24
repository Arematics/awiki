package com.arematics.wiki.repository;

import com.arematics.wiki.model.MenuGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "group", path = "group")
public interface MenuGroupRepository extends JpaRepository<MenuGroup, Long> {
}
