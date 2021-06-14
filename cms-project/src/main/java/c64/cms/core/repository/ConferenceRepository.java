package c64.cms.core.repository;

import c64.cms.core.model.Conference;

import java.util.Date;
import java.util.List;

public interface ConferenceRepository extends Repository<Conference, Long> {
    List<Conference> findAllByEndDateAfter(Date date);
}

