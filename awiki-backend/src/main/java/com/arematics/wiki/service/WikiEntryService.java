package com.arematics.wiki.service;

import com.arematics.wiki.exception.WikiEntryNotFoundException;
import com.arematics.wiki.model.WikiEntry;
import com.arematics.wiki.repository.WikiEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WikiEntryService {

    private final WikiEntryRepository repository;

    @Autowired
    public WikiEntryService(WikiEntryRepository repository){
        this.repository = repository;
    }

    public List<WikiEntry> listWikiEntries(int limit){
        Page<WikiEntry> page = repository.findAll(PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "lastModifiedDate")));
        return page.getContent();
    }

    @Cacheable(cacheNames = "wikiParentCache")
    public List<WikiEntry> findByParent(long id){
        return repository.findAllByParent(id);
    }

    @Cacheable(cacheNames = "wikiContentMatch")
    public List<WikiEntry> findByContentMatch(String match){
        return repository.searchByMatch(match);
    }

    private WikiEntry getEntry(long id){
        Optional<WikiEntry> entry = repository.findById(id);
        if(entry.isEmpty())
            throw new WikiEntryNotFoundException("WikiEntry with id: " + id + " could not be found");
        return entry.get();
    }

    private WikiEntry getEntry(String name){
        Optional<WikiEntry> entry = repository.findByName(name);
        if(entry.isEmpty())
            throw new WikiEntryNotFoundException("WikiEntry with name: " + name + " could not be found");
        return entry.get();
    }

    @CacheEvict(cacheNames = "wikiEntryCache", key = "#id")
    public void deleteEntry(long id){
        repository.deleteById(id);
    }

    @Cacheable(cacheNames = "wikiEntryCache", key = "#result.id")
    public WikiEntry getByValue(String value){
        try{
            return getEntry(Long.parseLong(value));
        }catch (NumberFormatException nfe){
            return getEntry(value);
        }
    }

    @CachePut(cacheNames = "wikiEntryCache", key = "#result.id")
    public WikiEntry saveEntry(WikiEntry entry){
        return repository.save(entry);
    }
}
