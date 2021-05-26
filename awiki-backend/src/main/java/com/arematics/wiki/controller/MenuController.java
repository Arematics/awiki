package com.arematics.wiki.controller;

import com.arematics.wiki.model.FullEntry;
import com.arematics.wiki.model.MenuGroup;
import com.arematics.wiki.repository.MenuGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/grouping/")
@RequiredArgsConstructor(onConstructor_=@Autowired)
public class MenuController {

    private final MenuGroupRepository menuGroupRepository;

    @PostMapping("updateIndex")
    public ResponseEntity<MenuGroup> updateOrderIndex(@RequestParam Long id, @RequestParam int orderIndex){
        Optional<MenuGroup> entry = menuGroupRepository.findById(id);
        if(entry.isPresent()){
            MenuGroup result = entry.get();
            result.setOrderIndex(orderIndex);
            return ResponseEntity.ok(menuGroupRepository.save(result));
        }else {
            throw new RuntimeException("Could not find group with id: " + id);
        }
    }
}
