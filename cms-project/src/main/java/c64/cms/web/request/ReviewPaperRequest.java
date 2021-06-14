package c64.cms.web.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ReviewPaperRequest {
    private Long paperId;
    private Long evaluatorId;

    // strong-accept / accept / weak-accept / borderline-paper / weak-reject / reject / strong-reject
    private String review;
}
