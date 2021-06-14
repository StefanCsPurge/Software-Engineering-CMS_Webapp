package c64.cms.web.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class BidPaperRequest {
    private Long paperId;
    private Long pcId;
    private String bid;
}
