import { useState } from "react";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import ApplicationCard, { Application } from "@/components/ApplicationCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle, XCircle, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  //todo: remove mock functionality
  const [applications, setApplications] = useState<Application[]>([
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
    {
      id: "4",
      referenceNumber: "RCC-2025-456789",
      applicantName: "Tapiwa Chikwanha",
      propertyAddress: "321 Herbert Chitepo Avenue, Masvingo",
      submittedDate: "2025-01-19",
      status: "under_review",
    },
    {
      id: "5",
      referenceNumber: "RCC-2025-567890",
      applicantName: "Nyasha Mutendera",
      propertyAddress: "654 Leopold Takawira Street, Masvingo",
      submittedDate: "2025-01-17",
      status: "rejected",
    },
  ]);

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === "submitted" || a.status === "under_review").length,
    approved: applications.filter(a => a.status === "approved").length,
    rejected: applications.filter(a => a.status === "rejected").length,
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = searchQuery === "" || 
      app.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (application: Application) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === application.id ? { ...app, status: "approved" as const } : app
      )
    );
    toast({
      title: "Application Approved",
      description: `${application.referenceNumber} has been approved successfully.`,
    });
    setDialogOpen(false);
  };

  const handleReject = (application: Application) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === application.id ? { ...app, status: "rejected" as const } : app
      )
    );
    toast({
      title: "Application Rejected",
      description: `${application.referenceNumber} has been rejected.`,
      variant: "destructive",
    });
    setDialogOpen(false);
  };

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage and review Rate Clearance Certificate applications
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard 
            title="Total Applications" 
            value={stats.total} 
            icon={FileText} 
            description="All time"
          />
          <StatsCard 
            title="Pending Review" 
            value={stats.pending} 
            icon={Clock} 
            description="Awaiting action"
          />
          <StatsCard 
            title="Approved" 
            value={stats.approved} 
            icon={CheckCircle} 
            description="Certificates issued"
          />
          <StatsCard 
            title="Rejected" 
            value={stats.rejected} 
            icon={XCircle} 
            description="Requires resubmission"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Applications</CardTitle>
            <CardDescription>
              Review and manage all certificate applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by reference, name, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-applications"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-status-filter">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all" data-testid="tab-all">
                  All ({filteredApplications.length})
                </TabsTrigger>
                <TabsTrigger value="pending" data-testid="tab-pending">
                  Pending ({filteredApplications.filter(a => a.status === "under_review" || a.status === "submitted").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No applications found
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredApplications.map((application) => (
                      <ApplicationCard
                        key={application.id}
                        application={application}
                        showActions={true}
                        onView={handleViewDetails}
                        onApprove={handleApprove}
                        onReject={handleReject}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                {filteredApplications.filter(a => a.status === "under_review" || a.status === "submitted").length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No pending applications
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredApplications
                      .filter(a => a.status === "under_review" || a.status === "submitted")
                      .map((application) => (
                        <ApplicationCard
                          key={application.id}
                          application={application}
                          showActions={true}
                          onView={handleViewDetails}
                          onApprove={handleApprove}
                          onReject={handleReject}
                        />
                      ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent data-testid="dialog-application-details">
          <DialogHeader>
            <DialogTitle className="font-heading">Application Details</DialogTitle>
            <DialogDescription>
              {selectedApplication?.referenceNumber}
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-muted-foreground">Applicant Name</p>
                  <p className="text-foreground">{selectedApplication.applicantName}</p>
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground">Submitted Date</p>
                  <p className="text-foreground">{selectedApplication.submittedDate}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-semibold text-muted-foreground">Property Address</p>
                  <p className="text-foreground">{selectedApplication.propertyAddress}</p>
                </div>
              </div>
              {selectedApplication.status === "under_review" && (
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={() => handleApprove(selectedApplication)}
                    data-testid="button-dialog-approve"
                  >
                    Approve Application
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleReject(selectedApplication)}
                    data-testid="button-dialog-reject"
                  >
                    Reject Application
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
