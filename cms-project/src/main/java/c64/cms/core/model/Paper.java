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
public class Paper extends BaseEntity<Long>{
    private Long conferenceId;
    private String name;
    private String topic;
    private String abstractPaper;
    private String fullPaper;  // link
    private Long authorId; // user ID
    private String reviewResult; // bid in the bidding phase, review afterwards
    private Long evaluatorId; // user ID
    private Long sectionId;
}
