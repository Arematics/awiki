package com.arematics.wiki.controller;

import com.arematics.wiki.model.WikiEntries;
import com.arematics.wiki.model.WikiEntry;
import com.arematics.wiki.service.WikiEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/entries")
public class WikiEntryController {

    private final WikiEntryService service;

    @Autowired
    public WikiEntryController(WikiEntryService service){
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.GET)
    public WikiEntries getWikiEntries(@RequestParam Optional<Integer> limit,
                                      @RequestParam Optional<String> matching,
                                      @RequestParam Optional<Long> parent){
        WikiEntries entries = new WikiEntries();
        limit.ifPresent(integer -> entries.setWikiEntries(service.listWikiEntries(integer)));
        matching.ifPresent(match -> entries.setWikiEntries(service.findByContentMatch(match)));
        parent.ifPresent(parentId -> entries.setWikiEntries(service.findByParent(parentId)));

        if(limit.isEmpty() && matching.isEmpty() && parent.isEmpty())
            entries.setWikiEntries(service.listWikiEntries(100));
        entries.add(linkTo(methodOn(WikiEntryController.class).getWikiEntries(limit, matching, parent)).withSelfRel());
        return entries;
    }

    @RequestMapping(value = "/{value}", method = RequestMethod.GET)
    public ResponseEntity<WikiEntry> getWikiEntry(@PathVariable("value") String value){
        WikiEntry entry = service.getByValue(value);
        entry.add(linkTo(methodOn(WikiEntryController.class).getWikiEntry(String.valueOf(entry.getId()))).withSelfRel());
        entry.add(linkTo(methodOn(WikiEntryController.class)
                .getWikiEntries(Optional.of(100), Optional.empty(), Optional.empty())).withRel("all"));
        if(entry.getParent() != null){
            entry.add(linkTo(methodOn(WikiEntryController.class)
                    .getWikiEntries(Optional.empty(), Optional.empty(), Optional.of(entry.getParent()))).withRel("byParent"));
        }
        return ResponseEntity.ok(service.getByValue(value));
    }

    @PostMapping
    public ResponseEntity<WikiEntry> postWikiEntry(@RequestBody WikiEntry entry) {
        service.saveEntry(entry);
        HttpHeaders responseHeaders = new HttpHeaders();
        String link = linkTo(methodOn(WikiEntryController.class).getWikiEntry(String.valueOf(entry.getId()))).toString();
        responseHeaders.set("location", link);

        return new ResponseEntity<>(responseHeaders, HttpStatus.CREATED);
    }

    @PutMapping(value = "/update/")
    public ResponseEntity<WikiEntry> updateItem(@RequestBody WikiEntry entry) {
        service.saveEntry(entry);
        HttpHeaders responseHeaders = new HttpHeaders();
        String link = linkTo(methodOn(WikiEntryController.class).getWikiEntry(String.valueOf(entry.getId()))).toString();
        responseHeaders.set("location", link);

        return new ResponseEntity<>(responseHeaders, HttpStatus.ACCEPTED);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteEntry(@PathVariable Long id){
        service.deleteEntry(id);
    }
}
