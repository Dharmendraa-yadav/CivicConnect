package civicconnect_backend.service;

import civicconnect_backend.entity.Issue;
import civicconnect_backend.repository.IssueRepository;
import civicconnect_backend.entity.IssueStatusHistory;
import civicconnect_backend.repository.IssueStatusHistoryRepository;
import civicconnect_backend.entity.IssueAuditLog;
import civicconnect_backend.repository.IssueAuditLogRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;


@Service
public class IssueService {

private final IssueRepository issueRepository;
private final IssueStatusHistoryRepository issueStatusHistoryRepository;
private final IssueAuditLogRepository issueAuditLogRepository;

public IssueService(
        IssueRepository issueRepository,
        IssueStatusHistoryRepository issueStatusHistoryRepository,
        IssueAuditLogRepository issueAuditLogRepository) {

    this.issueRepository = issueRepository;
    this.issueStatusHistoryRepository = issueStatusHistoryRepository;
    this.issueAuditLogRepository = issueAuditLogRepository;
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
public Issue updateIssue(Long id, Issue updatedIssue, String adminEmail) {

    Issue existingIssue = issueRepository.findById(id).orElse(null);

    if (existingIssue == null) {
        return null;
    }

    String oldStatus = existingIssue.getStatus();
    String newStatus = updatedIssue.getStatus();

    existingIssue.setTitle(updatedIssue.getTitle());
    existingIssue.setDescription(updatedIssue.getDescription());
    existingIssue.setCategory(updatedIssue.getCategory());
    existingIssue.setLocation(updatedIssue.getLocation());
    existingIssue.setPriority(updatedIssue.getPriority());
    existingIssue.setStatus(newStatus);
    existingIssue.setReportedBy(updatedIssue.getReportedBy());

    Issue savedIssue = issueRepository.save(existingIssue);

    if (oldStatus != null && !oldStatus.equals(newStatus)) {

        IssueStatusHistory history = new IssueStatusHistory();

        history.setIssueId(savedIssue.getId());
        history.setOldStatus(oldStatus);
        history.setNewStatus(newStatus);
        history.setChangedBy(adminEmail);

        issueStatusHistoryRepository.save(history);
    }
    
    if (oldStatus != null && !oldStatus.equals(newStatus)) {

    IssueAuditLog auditLog = new IssueAuditLog();

    auditLog.setIssueId(savedIssue.getId());
    auditLog.setAdminEmail(adminEmail);
    auditLog.setAction("STATUS_CHANGED");
    auditLog.setDescription(
            oldStatus + " → " + newStatus
    );

    issueAuditLogRepository.save(auditLog);
}

    return savedIssue;
}
public boolean deleteIssue(Long id, String adminEmail) {

    if (!issueRepository.existsById(id)) {
        return false;
    }

    issueRepository.deleteById(id);

    IssueAuditLog auditLog = new IssueAuditLog();

    auditLog.setIssueId(id);
    auditLog.setAdminEmail(adminEmail);
    auditLog.setAction("ISSUE_DELETED");
    auditLog.setDescription("Issue #" + id + " was deleted");

    issueAuditLogRepository.save(auditLog);

    return true;
}


}