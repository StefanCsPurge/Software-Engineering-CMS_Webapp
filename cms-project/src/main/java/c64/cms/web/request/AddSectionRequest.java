package c64.cms.web.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AddSectionRequest {
    Long conferenceId;
    String name;
    Long chairId;
}
