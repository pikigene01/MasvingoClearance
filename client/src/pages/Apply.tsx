import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import ApplicationForm from "@/components/ApplicationForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Apply() {
  const [, setLocation] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");

  const handleSubmit = (data: any) => {
    //todo: remove mock functionality
    const mockReferenceNumber = `RCC-2025-${Math.floor(Math.random() * 900000 + 100000)}`;
    setReferenceNumber(mockReferenceNumber);
    setSubmitted(true);
    console.log("Application submitted:", data);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-12">
          <Alert className="bg-status-approved/5 border-status-approved">
            <CheckCircle2 className="h-5 w-5 text-status-approved" />
            <AlertTitle className="text-lg font-semibold">Application Submitted Successfully!</AlertTitle>
            <AlertDescription className="space-y-4 mt-2">
              <p>
                Your Rate Clearance Certificate application has been received and is being processed.
              </p>
              <div className="bg-background/50 p-4 rounded-md">
                <p className="text-sm font-semibold mb-1">Your Reference Number:</p>
                <p className="text-2xl font-mono font-bold text-primary" data-testid="text-reference-number">
                  {referenceNumber}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Please save this reference number. You can use it to track your application status.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button onClick={() => setLocation("/track")} data-testid="button-track-application">
                  Track Application
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSubmitted(false);
                    setReferenceNumber("");
                  }}
                  data-testid="button-submit-another"
                >
                  Submit Another Application
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2">
            Apply for Rate Clearance Certificate
          </h1>
          <p className="text-muted-foreground">
            Complete all required information to submit your application
          </p>
        </div>
        <ApplicationForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
