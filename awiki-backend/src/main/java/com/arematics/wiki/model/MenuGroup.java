package com.arematics.wiki.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "menu_groups")
public class MenuGroup implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private Integer orderIndex;
    @OneToMany
    @JoinColumn(name = "menu_group", referencedColumnName = "id")
    private Set<WikiEntry> entries;
}
