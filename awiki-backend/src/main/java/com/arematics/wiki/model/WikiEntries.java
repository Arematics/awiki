package com.arematics.wiki.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.hateoas.RepresentationModel;

import java.util.List;

@EqualsAndHashCode(callSuper = false)
@Data
public class WikiEntries extends RepresentationModel<WikiEntries> {
    private List<WikiEntry> wikiEntries;
}
