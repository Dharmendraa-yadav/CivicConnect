package civicconnect_backend.repository;

import civicconnect_backend.entity.IssueAuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueAuditLogRepository
        extends JpaRepository<IssueAuditLog, Long> {

    List<IssueAuditLog> findByIssueIdOrderByCreatedAtAsc(Long issueId);
}