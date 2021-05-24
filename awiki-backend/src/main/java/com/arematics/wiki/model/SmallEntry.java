package com.arematics.wiki.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "wiki_entries")
public class SmallEntry implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private Integer orderIndex;
    private Timestamp lastChange;
    @ManyToOne
    @JoinColumn(name = "menu_group")
    private MenuGroup group;
}
