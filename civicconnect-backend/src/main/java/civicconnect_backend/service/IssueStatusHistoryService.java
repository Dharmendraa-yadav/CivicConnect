package civicconnect_backend.service;

import civicconnect_backend.entity.IssueStatusHistory;
import civicconnect_backend.repository.IssueStatusHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueStatusHistoryService {

    private final IssueStatusHistoryRepository issueStatusHistoryRepository;

    public IssueStatusHistoryService(
            IssueStatusHistoryRepository issueStatusHistoryRepository) {

        this.issueStatusHistoryRepository = issueStatusHistoryRepository;
    }

    public List<IssueStatusHistory> getHistoryByIssueId(Long issueId) {
        return issueStatusHistoryRepository
                .findByIssueIdOrderByChangedAtAsc(issueId);
    }
}