package civicconnect_backend.controller;

import jakarta.validation.Valid;
import civicconnect_backend.entity.Issue;
import civicconnect_backend.service.IssueService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.security.core.Authentication;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }
    @GetMapping("/api/issues")
   public java.util.List<Issue> getAllIssues() {
    return issueService.getAllIssues();
}
@GetMapping("/api/issues/{id}")
public Issue getIssueById(@PathVariable Long id) {
    return issueService.getIssueById(id);
}
@PostMapping("/api/issues")
public Issue createIssue(
        Authentication authentication,
        @Valid @RequestBody Issue issue) {

    String email = authentication.getName();

    issue.setReportedBy(email);

    return issueService.createIssue(issue);
}


@GetMapping("/api/issues/my")
public java.util.List<Issue> getMyIssues(Authentication authentication) {

    String email = authentication.getName();

    return issueService.getIssuesByUser(email);
}
}