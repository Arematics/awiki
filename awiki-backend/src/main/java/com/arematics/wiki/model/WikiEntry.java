package com.arematics.wiki.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@EqualsAndHashCode(callSuper = false)
@Data
@EntityListeners(AuditingEntityListener.class)
@Table(name = "wiki_entry")
public class WikiEntry extends RepresentationModel<WikiEntry> implements Serializable {
    private static final long serialVersionUID = 1L;

    @LastModifiedDate
    @Column(name = "last_modified_date")
    private Date lastModifiedDate;
    @Column(name = "parent")
    private Long parent;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    private String content;

}
