package c64.cms.core.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity @IdClass(PermissionId.class)
public class Permission implements Serializable {
    @Id
    private Long conferenceId;
    @Id
    private Long userId;
    @Id
    private String permission;  // pc / chair / author / listener
}
