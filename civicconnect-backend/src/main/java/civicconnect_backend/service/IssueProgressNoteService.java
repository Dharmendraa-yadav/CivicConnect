package civicconnect_backend.service;

import civicconnect_backend.entity.IssueProgressNote;
import civicconnect_backend.repository.IssueProgressNoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueProgressNoteService {

    private final IssueProgressNoteRepository issueProgressNoteRepository;

    public IssueProgressNoteService(
            IssueProgressNoteRepository issueProgressNoteRepository) {

        this.issueProgressNoteRepository = issueProgressNoteRepository;
    }

    public List<IssueProgressNote> getNotesByIssueId(Long issueId) {
        return issueProgressNoteRepository
                .findByIssueIdOrderByCreatedAtAsc(issueId);
    }

    public IssueProgressNote createNote(IssueProgressNote note) {
        return issueProgressNoteRepository.save(note);
    }
}