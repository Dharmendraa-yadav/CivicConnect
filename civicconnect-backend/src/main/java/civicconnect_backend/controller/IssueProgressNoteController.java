package civicconnect_backend.controller;

import civicconnect_backend.entity.IssueProgressNote;
import civicconnect_backend.service.IssueProgressNoteService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:5173")
public class IssueProgressNoteController {

    private final IssueProgressNoteService issueProgressNoteService;

    public IssueProgressNoteController(
            IssueProgressNoteService issueProgressNoteService) {

        this.issueProgressNoteService = issueProgressNoteService;
    }

    @GetMapping("/{issueId}/notes")
    public List<IssueProgressNote> getNotes(
            @PathVariable Long issueId) {

        return issueProgressNoteService
                .getNotesByIssueId(issueId);
    }

    @PostMapping("/{issueId}/notes")
    public IssueProgressNote addNote(
            @PathVariable Long issueId,
            @RequestBody IssueProgressNote note,
            Authentication authentication) {

        note.setIssueId(issueId);
        note.setAddedBy(authentication.getName());

        return issueProgressNoteService.createNote(note);
    }
}