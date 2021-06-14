package c64.cms.core.repository;

import c64.cms.core.model.Permission;
import c64.cms.core.model.PermissionId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PermissionRepository
    extends JpaRepository<Permission, PermissionId> {
    List<Permission> findByConferenceIdAndUserId(Long conferenceId, Long UserId);
    List<Permission> findByUserId(Long userId);
    List<Permission> findByConferenceIdAndPermission(Long conferenceId, String permission);
}
