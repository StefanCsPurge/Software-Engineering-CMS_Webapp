package c64.cms.core.repository;

import c64.cms.core.model.Section;

import java.util.List;

public interface SectionRepository extends Repository<Section, Long> {
    List<Section> findByConferenceId(Long conferenceId);
}
