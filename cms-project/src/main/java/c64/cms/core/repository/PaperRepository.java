package c64.cms.core.repository;

import c64.cms.core.model.Paper;

import java.util.List;

public interface PaperRepository extends Repository<Paper, Long>{
    List<Paper> findByAuthorId(Long authorId);
    List<Paper> findByEvaluatorId(Long pcId);
    List<Paper> findByConferenceId(Long conferenceId);
    List<Paper> findByEvaluatorIdAndConferenceId(Long evaluatorId, Long conferenceId);
}
