package civicconnect_backend.repository;

import civicconnect_backend.entity.IssueProgressNote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueProgressNoteRepository
        extends JpaRepository<IssueProgressNote, Long> {

    List<IssueProgressNote> findByIssueIdOrderByCreatedAtAsc(Long issueId);
}