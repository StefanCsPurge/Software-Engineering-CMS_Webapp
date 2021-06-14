package c64.cms.web.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AddSectionToPaperRequest {
    private Long paperId;
    private Long sectionId;
}
