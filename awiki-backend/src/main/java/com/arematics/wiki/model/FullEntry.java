package com.arematics.wiki.model;

import com.arematics.wiki.json.TitleLengthSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "wiki_entries")
public class FullEntry implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonSerialize(using= TitleLengthSerializer.class)
    private String title;
    private Integer orderIndex;
    private boolean published;
    private Timestamp lastChange;
    @Column(name = "menu_group")
    private Long menuGroup;
    private String image;
    private String content;
    private Integer calls;
}
