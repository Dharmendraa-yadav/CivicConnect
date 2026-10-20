package civicconnect_backend.controller;

import civicconnect_backend.entity.IssueStatusHistory;
import civicconnect_backend.service.IssueStatusHistoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:5173")
public class IssueStatusHistoryController {

    private final IssueStatusHistoryService issueStatusHistoryService;

    public IssueStatusHistoryController(
            IssueStatusHistoryService issueStatusHistoryService) {

        this.issueStatusHistoryService = issueStatusHistoryService;
    }

    @GetMapping("/{issueId}/history")
    public List<IssueStatusHistory> getIssueHistory(
            @PathVariable Long issueId) {

        return issueStatusHistoryService
                .getHistoryByIssueId(issueId);
    }
}