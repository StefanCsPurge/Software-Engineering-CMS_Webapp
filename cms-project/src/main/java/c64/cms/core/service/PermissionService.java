package c64.cms.core.service;

import c64.cms.core.model.Permission;

import java.util.List;

public interface PermissionService {
    List<Permission> getAllPermissions(Long userId);
    boolean isAuthor(Long conferenceId, Long userId);
    boolean isChair(Long conferenceId, Long userId);
    List<Long> getAllAuthorIDs(Long conferenceId);
    List<Long> getAllChairIDs(Long conferenceId);

    List<Permission> getAllUsersPermissions();
}
