package civicconnect_backend.service;

import civicconnect_backend.entity.IssueAuditLog;
import civicconnect_backend.repository.IssueAuditLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueAuditLogService {

    private final IssueAuditLogRepository issueAuditLogRepository;

    public IssueAuditLogService(
            IssueAuditLogRepository issueAuditLogRepository) {

        this.issueAuditLogRepository = issueAuditLogRepository;
    }

    public List<IssueAuditLog> getLogsByIssueId(Long issueId) {
        return issueAuditLogRepository
                .findByIssueIdOrderByCreatedAtAsc(issueId);
    }

    public IssueAuditLog createLog(IssueAuditLog log) {
        return issueAuditLogRepository.save(log);
    }
}