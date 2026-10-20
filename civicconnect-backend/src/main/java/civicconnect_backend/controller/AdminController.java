package civicconnect_backend.controller;

import civicconnect_backend.entity.Issue;
import civicconnect_backend.service.IssueService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final IssueService issueService;

    public AdminController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping("/issues")
    public List<Issue> getAllIssuesForAdmin() {
        return issueService.getAllIssues();
    }

  @PutMapping("/issues/{id}")
public Issue updateIssueStatus(
        @PathVariable Long id,
        @RequestBody Issue updatedIssue,
        Authentication authentication) {

    String adminEmail = authentication.getName();

    return issueService.updateIssue(id, updatedIssue, adminEmail);
}
    @DeleteMapping("/issues/{id}")
public boolean deleteIssue(
        @PathVariable Long id,
        Authentication authentication) {

    String adminEmail = authentication.getName();

    return issueService.deleteIssue(id, adminEmail);
}
}