package c64.cms.core.service;

import c64.cms.core.model.Conference;
import c64.cms.core.model.Section;
import c64.cms.core.model.User;

import java.util.List;
import java.util.Optional;

public interface ConferenceService {

    List<Conference> getAllConferences();

    List<Conference> getAllUnfinishedConferences();

    void addConference(Conference conference);

    void addPCMember(Long conferenceId, Long userId, Boolean isChair);

    void addAuthor(Long conferenceId, Long userId) throws Exception;

    void addListener(Long conferenceId, Long userId);

    void addSection(Long conferenceId, String name, Long chairId) throws Exception;

    String getCurrentPhase(Long conferenceId);

    Optional<Conference> getConference(Long conferenceId);

    List<Section> getAllSections(Long conferenceId);

    // bidDeadlineReached -> conferenceId - boolean, checks if the bid deadline was reached
    Boolean bidDeadlineReached(Long conferenceId) throws Exception;

    // getPCMembersForConference -> conferenceId - returns a list of users, for chair in the 3rd phase to create the sections
    List<User> getPCMembersForConference(Long conferenceId);

}
