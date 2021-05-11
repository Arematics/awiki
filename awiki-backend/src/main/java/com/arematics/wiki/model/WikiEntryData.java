package com.arematics.wiki.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "wiki_entries_data")
public class WikiEntryData implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long entryId;
    private String image;
    private Integer calls;
    private String content;
}
