package c64.cms.core.model;


import lombok.*;

import javax.persistence.Entity;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class Section extends BaseEntity<Long>{
    private Long conferenceId;

    private String name;
    private Long chairId; // user ID
}
