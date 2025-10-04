import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge, { ApplicationStatus } from "./StatusBadge";
import { Calendar, MapPin, User } from "lucide-react";
import { type Application } from "@shared/schema";

export type { Application };

interface ApplicationCardProps {
  application: Application;
  onView?: (application: Application) => void;
  onApprove?: (application: Application) => void;
  onReject?: (application: Application) => void;
  showActions?: boolean;
}

export default function ApplicationCard({ 
  application, 
  onView, 
  onApprove, 
  onReject,
  showActions = false 
}: ApplicationCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`card-application-${application.id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">
            {application.referenceNumber}
          </CardTitle>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            <span data-testid="text-applicant-name">{application.fullName}</span>
          </div>
        </div>
        <StatusBadge status={application.status as ApplicationStatus} />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
            <span data-testid="text-property-address">{application.propertyAddress}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span data-testid="text-submitted-date">
              {new Date(application.submittedDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        {showActions && (
          <div className="flex flex-wrap gap-2 pt-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onView?.(application)}
              data-testid="button-view-details"
            >
              View Details
            </Button>
            {(application.status === "submitted" || application.status === "under_review") && (
              <>
                <Button 
                  size="sm" 
                  variant="default"
                  onClick={() => onApprove?.(application)}
                  data-testid="button-approve"
                >
                  Approve
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => onReject?.(application)}
                  data-testid="button-reject"
                >
                  Reject
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
