import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Headphones, 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Phone,
  Mail,
  Video,
  FileText,
  Star,
  Users,
  Zap,
  Calendar,
  Search,
  Filter,
  ExternalLink,
  ArrowRight,
  Shield
} from "lucide-react";
import { toast } from "sonner";

const supportTicketSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  attachments: z.array(z.string()).optional(),
});

type SupportTicketData = z.infer<typeof supportTicketSchema>;

const PrioritySupport = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [tickets, setTickets] = useState([
    {
      id: "T-2024-001",
      subject: "Resume export formatting issue",
      category: "Technical",
      priority: "medium",
      status: "in-progress",
      createdAt: "2024-01-15 09:30",
      lastUpdate: "2024-01-15 14:20",
      assignedTo: "Sarah Johnson",
      estimatedResolution: "Within 4 hours"
    },
    {
      id: "T-2024-002", 
      subject: "Account billing question",
      category: "Billing",
      priority: "low",
      status: "resolved",
      createdAt: "2024-01-14 16:45",
      lastUpdate: "2024-01-15 08:15",
      assignedTo: "Mike Chen",
      estimatedResolution: "Resolved"
    }
  ]);

  const form = useForm<SupportTicketData>({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: {
      subject: "",
      category: "",
      priority: "medium",
      description: "",
      attachments: [],
    },
  });

  const supportChannels = [
    {
      name: "Live Chat",
      description: "Instant messaging with support agents",
      availability: "24/7",
      averageResponse: "< 30 seconds",
      icon: <MessageCircle className="h-6 w-6" />,
      status: "online"
    },
    {
      name: "Priority Phone",
      description: "Direct phone line for premium users",
      availability: "24/7",
      averageResponse: "< 1 minute",
      icon: <Phone className="h-6 w-6" />,
      status: "online"
    },
    {
      name: "Video Call",
      description: "Screen sharing and video support",
      availability: "Business Hours",
      averageResponse: "< 5 minutes",
      icon: <Video className="h-6 w-6" />,
      status: "online"
    },
    {
      name: "Email Support",
      description: "Detailed written support",
      availability: "24/7",
      averageResponse: "< 1 hour",
      icon: <Mail className="h-6 w-6" />,
      status: "online"
    }
  ];

  const supportStats = {
    averageResponseTime: "2.3 minutes",
    resolutionRate: "98.5%", 
    satisfactionScore: "4.9/5",
    totalTickets: 1247,
    resolvedToday: 89,
    agentsOnline: 12
  };

  const knowledgeBase = [
    {
      title: "Getting Started Guide",
      description: "Complete walkthrough of all features",
      category: "Tutorials",
      views: 2340,
      helpful: 94,
      lastUpdated: "2024-01-10"
    },
    {
      title: "Resume Export Troubleshooting",
      description: "Common export issues and solutions", 
      category: "Troubleshooting",
      views: 1850,
      helpful: 87,
      lastUpdated: "2024-01-12"
    },
    {
      title: "Account & Billing FAQ",
      description: "Billing, subscriptions, and account management",
      category: "Billing",
      views: 1240,
      helpful: 92,
      lastUpdated: "2024-01-08"
    },
    {
      title: "ATS Optimization Best Practices",
      description: "How to optimize for applicant tracking systems",
      category: "Best Practices", 
      views: 3100,
      helpful: 96,
      lastUpdated: "2024-01-05"
    }
  ];

  const recentUpdates = [
    {
      type: "Feature Release",
      title: "New LinkedIn integration launched",
      description: "Import and sync your LinkedIn profile data",
      timestamp: "2 hours ago",
      impact: "All Users"
    },
    {
      type: "Maintenance",
      title: "Scheduled maintenance completed",
      description: "Export services temporarily unavailable",
      timestamp: "6 hours ago", 
      impact: "Resolved"
    },
    {
      type: "Enhancement",
      title: "Improved PDF export quality",
      description: "Better font rendering and layout optimization",
      timestamp: "1 day ago",
      impact: "PDF Exports"
    }
  ];

  const onSubmit = (data: SupportTicketData) => {
    const newTicket = {
      id: `T-2024-${String(tickets.length + 1).padStart(3, '0')}`,
      subject: data.subject,
      category: data.category,
      priority: data.priority,
      status: "open" as const,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      lastUpdate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      assignedTo: "Auto-assigned",
      estimatedResolution: data.priority === "urgent" ? "Within 1 hour" : 
                          data.priority === "high" ? "Within 2 hours" :
                          data.priority === "medium" ? "Within 4 hours" : "Within 24 hours"
    };

    setTickets(prev => [newTicket, ...prev]);
    form.reset();
    toast.success("Support ticket created successfully!");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "destructive"; 
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "default";
      case "in-progress": return "secondary";
      case "open": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Headphones className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">Priority Support Center</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get instant help from our expert support team. Premium users enjoy priority access and faster response times.
          </p>
        </div>

        {/* Support Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-lg font-bold text-primary">{supportStats.averageResponseTime}</div>
              <div className="text-xs text-muted-foreground">Avg Response</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-lg font-bold text-primary">{supportStats.resolutionRate}</div>
              <div className="text-xs text-muted-foreground">Resolution Rate</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-lg font-bold text-primary">{supportStats.satisfactionScore}</div>
              <div className="text-xs text-muted-foreground">Satisfaction</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-lg font-bold text-primary">{supportStats.agentsOnline}</div>
              <div className="text-xs text-muted-foreground">Agents Online</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-lg font-bold text-primary">{supportStats.resolvedToday}</div>
              <div className="text-xs text-muted-foreground">Resolved Today</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-lg font-bold text-primary">{supportStats.totalTickets}</div>
              <div className="text-xs text-muted-foreground">Total Tickets</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 glass-card">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="channels" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Support Channels
            </TabsTrigger>
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              My Tickets
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="status" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Service Status
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Actions */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start h-auto p-4">
                    <MessageCircle className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Start Live Chat</div>
                      <div className="text-xs text-muted-foreground">Get instant help from our support team</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-auto p-4">
                    <FileText className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Create Support Ticket</div>
                      <div className="text-xs text-muted-foreground">Submit a detailed support request</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-auto p-4">
                    <Phone className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Request Callback</div>
                      <div className="text-xs text-muted-foreground">Schedule a call with our experts</div>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tickets.slice(0, 3).map((ticket) => (
                      <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{ticket.subject}</div>
                          <div className="text-xs text-muted-foreground">
                            {ticket.id} • Updated {ticket.lastUpdate}
                          </div>
                        </div>
                        <Badge variant={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Tickets
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="channels">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Choose Your Support Channel</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportChannels.map((channel, index) => (
                  <Card key={index} className="glass-card hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {channel.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{channel.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <div className={`w-2 h-2 rounded-full ${
                                channel.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                              <span className="text-xs text-muted-foreground">{channel.status}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline">{channel.availability}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-3">{channel.description}</p>
                      <div className="text-sm text-muted-foreground mb-4">
                        Average response: {channel.averageResponse}
                      </div>
                      <Button className="w-full">
                        Connect Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Create Ticket Form */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Create Support Ticket</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject *</FormLabel>
                              <FormControl>
                                <Input placeholder="Brief description of your issue" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="technical">Technical Issues</SelectItem>
                                  <SelectItem value="billing">Billing & Account</SelectItem>
                                  <SelectItem value="feature">Feature Request</SelectItem>
                                  <SelectItem value="general">General Inquiry</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priority Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">Low - General question</SelectItem>
                                <SelectItem value="medium">Medium - Minor issue</SelectItem>
                                <SelectItem value="high">High - Major problem</SelectItem>
                                <SelectItem value="urgent">Urgent - Service down</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide detailed information about your issue..."
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full">
                        Submit Ticket
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tickets">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">My Support Tickets</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">Create New Ticket</Button>
                </div>
              </div>

              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <Card key={ticket.id} className="glass-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{ticket.subject}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>Ticket {ticket.id}</span>
                            <span>Created {ticket.createdAt}</span>
                            <span>Assigned to {ticket.assignedTo}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                          <Badge variant={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Category:</span> {ticket.category} • 
                          <span className="font-medium"> Last updated:</span> {ticket.lastUpdate}
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">
                            {ticket.estimatedResolution}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="knowledge">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Knowledge Base</h3>
                <div className="flex gap-2">
                  <Input placeholder="Search articles..." className="w-64" />
                  <Button variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {knowledgeBase.map((article, index) => (
                  <Card key={index} className="glass-card hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{article.title}</CardTitle>
                          <Badge variant="outline" className="mt-2">{article.category}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{article.description}</p>
                      <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          <span>{article.views} views</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{article.helpful}% helpful</span>
                          </div>
                        </div>
                        <span>Updated {article.lastUpdated}</span>
                      </div>
                      <Button variant="outline" className="w-full">
                        Read Article
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="status">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Service Status & Updates</h3>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    All Systems Operational
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                      <div className="font-medium">Resume Builder</div>
                      <div className="text-xs text-muted-foreground">Operational</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                      <div className="font-medium">Export Services</div>
                      <div className="text-xs text-muted-foreground">Operational</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                      <div className="font-medium">Support System</div>
                      <div className="text-xs text-muted-foreground">Operational</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUpdates.map((update, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="p-2 bg-primary/10 rounded">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{update.title}</div>
                              <p className="text-sm text-muted-foreground mt-1">{update.description}</p>
                            </div>
                            <Badge variant="outline">{update.type}</Badge>
                          </div>
                          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                            <span>{update.timestamp}</span>
                            <span>Impact: {update.impact}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PrioritySupport;