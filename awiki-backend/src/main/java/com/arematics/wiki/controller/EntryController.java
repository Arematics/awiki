package com.arematics.wiki.controller;

import com.arematics.wiki.model.FullEntry;
import com.arematics.wiki.model.MenuGroup;
import com.arematics.wiki.model.SmallEntry;
import com.arematics.wiki.repository.FullEntryRepository;
import com.arematics.wiki.repository.SmallEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/entry")
@RequiredArgsConstructor(onConstructor_=@Autowired)
public class EntryController {

    private final FullEntryRepository fullEntryRepository;
    private final SmallEntryRepository smallEntryRepository;

    @RolesAllowed("admin")
    @GetMapping("childrenOfGroup/{id}")
    public List<SmallEntry> findAllByGroup(@PathVariable Long id){
        return smallEntryRepository.findAllByGroup_Id(id);
    }

    @GetMapping("publishedChildrenOfGroup/{id}")
    public List<SmallEntry> findAllPublishedByGroup(@PathVariable Long id){
        return smallEntryRepository.findAllByGroup_IdAndPublishedIsTrue(id);
    }

    @GetMapping("existsByTitleAndGroup")
    public boolean existsByTitleAndGroup(@RequestParam String title, @RequestParam Long id){
        return smallEntryRepository.existsByTitleAndGroup_Id(title, id);
    }

    @GetMapping("/{id}")
    public FullEntry findFullEntry(@PathVariable Long id){
        SecurityContext securityContext = SecurityContextHolder.getContext();
        boolean isAdmin = securityContext.getAuthentication().getAuthorities()
                .stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_admin"));
        Optional<FullEntry> entry = fullEntryRepository.findById(id);
        if(entry.isPresent() && (isAdmin || entry.get().isPublished())){
            FullEntry result = entry.get();
            result.setCalls(result.getCalls() + 1);
            return fullEntryRepository.save(result);
        }else{
            throw new RuntimeException("Could not find entry with id: " + id);
        }
    }

    @GetMapping("/{id}/group")
    public MenuGroup findGroupByEntry(@PathVariable Long id){
        Optional<SmallEntry> entry = smallEntryRepository.findById(id);
        return entry
                .map(SmallEntry::getGroup)
                .orElseThrow(() -> new RuntimeException("Could not find group for entry with id: " + id));
    }

    @PostMapping
    public FullEntry updateEntry(@RequestBody FullEntry fullEntry){
        return fullEntryRepository.save(fullEntry);
    }

    @DeleteMapping("/{id}")
    public void deleteEntry(@PathVariable Long id){
        fullEntryRepository.deleteById(id);
    }

    @GetMapping
    public List<FullEntry> findAll(
            @PageableDefault(size = 6, direction = Sort.Direction.DESC, sort = "calls") Pageable pageable){
        return fullEntryRepository.findAllByPublishedIsTrue(pageable);
    }

    @GetMapping("findAllByContent")
    public List<FullEntry> findAllByContentContains(@RequestParam String like){
        return fullEntryRepository.findAllByContentContainsAndPublishedIsTrue(like);
    }

    @GetMapping("findAllByTitle")
    public List<FullEntry> findAllByTitleContains(@RequestParam String title){
        return fullEntryRepository.findAllByTitleContainsAndPublishedIsTrue(title);
    }

    @RolesAllowed("admin")
    @PostMapping("/update/index")
    public ResponseEntity<FullEntry> updateOrderIndex(@RequestParam Long id, @RequestParam int orderIndex){
        Optional<FullEntry> entry = fullEntryRepository.findById(id);
        if(entry.isPresent() && entry.get().isPublished()){
            FullEntry result = entry.get();
            result.setOrderIndex(orderIndex);
            return ResponseEntity.ok(fullEntryRepository.save(result));
        }else{
            throw new RuntimeException("Could not find entry with id: " + id);
        }
    }
}
