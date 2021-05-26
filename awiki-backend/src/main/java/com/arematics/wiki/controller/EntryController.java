package com.arematics.wiki.controller;

import com.arematics.wiki.model.FullEntry;
import com.arematics.wiki.model.SmallEntry;
import com.arematics.wiki.repository.FullEntryRepository;
import com.arematics.wiki.repository.SmallEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/entry/")
@RequiredArgsConstructor(onConstructor_=@Autowired)
public class EntryController {

    private final FullEntryRepository fullEntryRepository;

    @GetMapping("{id}")
    public FullEntry fetchFullEntryWithUpdateCalls(@PathVariable Long id){
        Optional<FullEntry> entry = fullEntryRepository.findById(id);
        if(entry.isPresent()){
            FullEntry result = entry.get();
            result.setCalls(result.getCalls() + 1);
            return fullEntryRepository.save(result);
        }else{
            throw new RuntimeException("Could not find entry with id: " + id);
        }
    }

    @PostMapping("updateIndex")
    public ResponseEntity<FullEntry> updateOrderIndex(@RequestParam Long id, @RequestParam int orderIndex){
        Optional<FullEntry> entry = fullEntryRepository.findById(id);
        if(entry.isPresent()){
            FullEntry result = entry.get();
            result.setOrderIndex(orderIndex);
            return ResponseEntity.ok(fullEntryRepository.save(result));
        }else{
            throw new RuntimeException("Could not find entry with id: " + id);
        }
    }
}
