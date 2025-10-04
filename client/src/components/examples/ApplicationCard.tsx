import ApplicationCard from '../ApplicationCard'

export default function ApplicationCardExample() {
  const application = {
    id: "1",
    referenceNumber: "RCC-2025-001234",
    applicantName: "Tendai Moyo",
    propertyAddress: "123 Robert Mugabe Avenue, Masvingo",
    submittedDate: "2025-01-15",
    status: "under_review" as const,
  };

  return (
    <div className="max-w-md">
      <ApplicationCard 
        application={application}
        showActions={true}
        onView={() => console.log("View clicked")}
        onApprove={() => console.log("Approve clicked")}
        onReject={() => console.log("Reject clicked")}
      />
    </div>
  )
}
