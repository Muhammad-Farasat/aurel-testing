import { useNavigate } from "react-router-dom";
import { JourneyFields } from "../../components/booking/JourneyFields";
import { StepHead, useReturnTo } from "../../components/booking/StepParts";

export function JourneyStep() {
  const navigate = useNavigate();
  const ret = useReturnTo();
  return (
    <div className="step">
      <StepHead n={1} title="Journey" />
      <JourneyFields
        variant="step"
        doneLabel={ret ? "Back to review" : "See vehicles"}
        onDone={() => navigate(ret ? "/book/review" : "/book/vehicle")}
      />
    </div>
  );
}
