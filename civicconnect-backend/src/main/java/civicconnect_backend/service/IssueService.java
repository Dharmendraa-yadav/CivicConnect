package civicconnect_backend.service;

import civicconnect_backend.entity.Issue;
import civicconnect_backend.repository.IssueRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

 public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }
  

    public java.util.List<Issue> getAllIssues() {
    return issueRepository.findAll();
}
public java.util.List<Issue> getIssuesByUser(String reportedBy) {
    return issueRepository.findByReportedBy(reportedBy);
}

public Issue getIssueById(Long id) {
    return issueRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Issue not found with id: " + id
            ));
}
public Issue createIssue(Issue issue) {
    return issueRepository.save(issue);
}
public Issue updateIssue(Long id, Issue updatedIssue) {
    Issue existingIssue = issueRepository.findById(id).orElse(null);

    if (existingIssue == null) {
        return null;
    }

    existingIssue.setTitle(updatedIssue.getTitle());
    existingIssue.setDescription(updatedIssue.getDescription());
    existingIssue.setCategory(updatedIssue.getCategory());
    existingIssue.setLocation(updatedIssue.getLocation());
    existingIssue.setPriority(updatedIssue.getPriority());
    existingIssue.setStatus(updatedIssue.getStatus());
    existingIssue.setReportedBy(updatedIssue.getReportedBy());

    return issueRepository.save(existingIssue);
}
public boolean deleteIssue(Long id) {
    if (!issueRepository.existsById(id)) {
        return false;
    }

    issueRepository.deleteById(id);
    return true;
}



}