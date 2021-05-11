package com.arematics.wiki.model;

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
public class WikiEntry implements Serializable {
    @Id
    private Long id;
    private String title;
    private Integer orderIndex;
    private Timestamp lastChange;
    @OneToOne
    @JoinColumn(name = "menu_group")
    private MenuGroup menuGroup;
}
