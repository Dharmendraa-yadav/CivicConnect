package civicconnect_backend.controller;

import civicconnect_backend.entity.IssueAuditLog;
import civicconnect_backend.service.IssueAuditLogService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:5173")
public class IssueAuditLogController {

    private final IssueAuditLogService issueAuditLogService;

    public IssueAuditLogController(
            IssueAuditLogService issueAuditLogService) {

        this.issueAuditLogService = issueAuditLogService;
    }

    @GetMapping("/{issueId}/audit-logs")
    public List<IssueAuditLog> getAuditLogs(
            @PathVariable Long issueId) {

        return issueAuditLogService
                .getLogsByIssueId(issueId);
    }
}