import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Award } from "lucide-react";

interface CertificatePreviewProps {
  referenceNumber: string;
  applicantName: string;
  propertyAddress: string;
  approvalDate: string;
  onDownload?: () => void;
}

export default function CertificatePreview({
  referenceNumber,
  applicantName,
  propertyAddress,
  approvalDate,
  onDownload,
}: CertificatePreviewProps) {
  return (
    <Card className="bg-gradient-to-br from-card to-accent/5" data-testid="card-certificate">
      <CardContent className="p-8 space-y-6">
        <div className="flex items-center justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Award className="h-12 w-12 text-primary" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold font-heading text-primary">
            Rate Clearance Certificate
          </h3>
          <p className="text-sm text-muted-foreground">Masvingo City Council</p>
        </div>

        <div className="border-t border-b py-4 space-y-3">
          <div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
            <span className="font-semibold">Certificate No:</span>
            <span data-testid="text-certificate-number">{referenceNumber}</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
            <span className="font-semibold">Issued To:</span>
            <span data-testid="text-certificate-name">{applicantName}</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
            <span className="font-semibold">Property:</span>
            <span data-testid="text-certificate-property">{propertyAddress}</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
            <span className="font-semibold">Issue Date:</span>
            <span data-testid="text-certificate-date">{approvalDate}</span>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground italic">
            This certifies that all municipal rates and taxes for the above property 
            have been paid in full as of the issue date.
          </p>
          
          <Button 
            className="w-full sm:w-auto" 
            onClick={onDownload}
            data-testid="button-download-certificate"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Certificate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
