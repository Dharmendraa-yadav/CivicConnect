package civicconnect_backend.repository;

import civicconnect_backend.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {

    List<Issue> findByReportedBy(String reportedBy);
}