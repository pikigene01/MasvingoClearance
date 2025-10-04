import { useState } from "react";
import Header from "@/components/Header";
import TrackingForm from "@/components/TrackingForm";
import ApplicationCard, { Application } from "@/components/ApplicationCard";
import ApplicationTimeline from "@/components/ApplicationTimeline";
import CertificatePreview from "@/components/CertificatePreview";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Track() {
  const [searchedApplication, setSearchedApplication] = useState<Application | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (referenceNumber: string) => {
    //todo: remove mock functionality
    const mockApplications: Application[] = [
      {
        id: "1",
        referenceNumber: "RCC-2025-123456",
        applicantName: "Tendai Moyo",
        propertyAddress: "123 Robert Mugabe Avenue, Masvingo",
        submittedDate: "2025-01-15",
        status: "approved",
      },
      {
        id: "2",
        referenceNumber: "RCC-2025-234567",
        applicantName: "Rudo Ncube",
        propertyAddress: "456 Josiah Tongogara Street, Masvingo",
        submittedDate: "2025-01-18",
        status: "under_review",
      },
      {
        id: "3",
        referenceNumber: "RCC-2025-345678",
        applicantName: "Chenai Mashoko",
        propertyAddress: "789 Simon Mazorodze Road, Masvingo",
        submittedDate: "2025-01-20",
        status: "submitted",
      },
    ];

    const found = mockApplications.find(
      app => app.referenceNumber.toLowerCase() === referenceNumber.toLowerCase()
    );

    if (found) {
      setSearchedApplication(found);
      setNotFound(false);
    } else {
      setSearchedApplication(null);
      setNotFound(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2">
            Track Your Application
          </h1>
          <p className="text-muted-foreground">
            Enter your reference number to view the status of your application
          </p>
        </div>

        <div className="space-y-6">
          <TrackingForm onSearch={handleSearch} />

          {notFound && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Application not found. Please check your reference number and try again.
                <br />
                <span className="text-xs mt-1 block">
                  Try: RCC-2025-123456, RCC-2025-234567, or RCC-2025-345678
                </span>
              </AlertDescription>
            </Alert>
          )}

          {searchedApplication && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <ApplicationCard application={searchedApplication} />
                <ApplicationTimeline 
                  status={searchedApplication.status}
                  submittedDate={searchedApplication.submittedDate}
                  reviewDate={searchedApplication.status !== "submitted" ? "2025-01-16" : undefined}
                  completedDate={searchedApplication.status === "approved" ? "2025-01-20" : undefined}
                />
              </div>

              {searchedApplication.status === "approved" && (
                <div className="lg:sticky lg:top-24 h-fit">
                  <CertificatePreview
                    referenceNumber={searchedApplication.referenceNumber}
                    applicantName={searchedApplication.applicantName}
                    propertyAddress={searchedApplication.propertyAddress}
                    approvalDate="2025-01-20"
                    onDownload={() => console.log("Download certificate")}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
