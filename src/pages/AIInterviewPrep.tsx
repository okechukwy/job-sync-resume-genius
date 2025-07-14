import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Brain, 
  MessageSquare, 
  Users, 
  Target, 
  Clock, 
  CheckCircle2, 
  Play,
  Pause,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  RotateCcw,
  TrendingUp,
  Award,
  BookOpen,
  Lightbulb,
  Volume2,
  Search,
  X,
  Copy
} from "lucide-react";
import { toast } from "sonner";

// Extend window interface for Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface AssessmentResult {
  overallScore: number;
  breakdown: {
    communication: number;
    content: number;
    structure: number;
    impact: number;
  };
  strengths: string[];
  improvements: string[];
  transcript: string;
}

const AIInterviewPrep = () => {
  const [activeTab, setActiveTab] = useState("practice");
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionHistory, setQuestionHistory] = useState<string[]>([]);
  
  // Audio recording states
  const [transcript, setTranscript] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  
  // Question browser modal states
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedBrowseCategory, setSelectedBrowseCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const practiceCategories = [
    {
      id: "behavioral",
      title: "Behavioral Questions",
      description: "STAR method responses for behavioral interviews",
      questions: 50,
      difficulty: "Medium",
      color: "bg-blue-500",
      sampleQuestions: [
        "Tell me about a time when you had to overcome a significant challenge at work.",
        "Describe a situation where you had to work with a difficult team member.",
        "Give me an example of when you had to make a decision with limited information.",
        "Tell me about a time when you failed and how you handled it.",
        "Describe a situation where you had to influence others without formal authority.",
        "Tell me about a time when you had to meet a tight deadline.",
        "Describe a situation where you had to work with limited resources.",
        "Give me an example of when you had to resolve a conflict between team members.",
        "Tell me about a time when you had to adapt to a significant change at work.",
        "Describe a situation where you had to take initiative without being asked.",
        "Give me an example of when you had to learn something new quickly.",
        "Tell me about a time when you had to give constructive feedback to a colleague.",
        "Describe a situation where you had to handle multiple priorities simultaneously.",
        "Give me an example of when you had to persuade someone to change their mind.",
        "Tell me about a time when you had to deal with an angry customer or stakeholder.",
        "Describe a situation where you had to work under pressure.",
        "Give me an example of when you had to be creative to solve a problem.",
        "Tell me about a time when you had to collaborate with people from different departments.",
        "Describe a situation where you had to improve a process or system.",
        "Give me an example of when you had to manage expectations effectively.",
        "Tell me about a time when you had to work with a cross-functional team.",
        "Describe a situation where you had to make a difficult ethical decision.",
        "Give me an example of when you had to mentor or train someone.",
        "Tell me about a time when you had to handle ambiguous requirements.",
        "Describe a situation where you had to negotiate a compromise.",
        "Give me an example of when you had to recover from a mistake.",
        "Tell me about a time when you had to work with incomplete information.",
        "Describe a situation where you had to motivate an unmotivated team member.",
        "Give me an example of when you had to challenge a decision made by senior leadership.",
        "Tell me about a time when you had to balance competing stakeholder interests.",
        "Describe a situation where you had to implement an unpopular change.",
        "Give me an example of when you had to work remotely with a distributed team.",
        "Tell me about a time when you had to solve a problem that had no clear solution.",
        "Describe a situation where you had to manage up effectively.",
        "Give me an example of when you had to take ownership of someone else's mistake.",
        "Tell me about a time when you had to work with someone from a different culture.",
        "Describe a situation where you had to learn from criticism or feedback.",
        "Give me an example of when you had to make a decision that affected team morale.",
        "Tell me about a time when you had to handle a crisis or emergency situation.",
        "Describe a situation where you had to work with limited budget constraints.",
        "Give me an example of when you had to build consensus among disagreeing parties.",
        "Tell me about a time when you had to delegate important tasks.",
        "Describe a situation where you had to pivot strategy mid-project.",
        "Give me an example of when you had to work with outdated tools or technology.",
        "Tell me about a time when you had to handle a customer complaint escalation.",
        "Describe a situation where you had to coordinate with external partners.",
        "Give me an example of when you had to maintain quality under time pressure.",
        "Tell me about a time when you had to present complex information to non-experts.",
        "Describe a situation where you had to work through a communication breakdown.",
        "Give me an example of when you had to innovate within constraints."
      ]
    },
    {
      id: "technical",
      title: "Technical Skills",
      description: "Role-specific technical assessment questions",
      questions: 75,
      difficulty: "Hard",
      color: "bg-purple-500",
      sampleQuestions: [
        "Explain the difference between REST and GraphQL APIs.",
        "How would you optimize a slow-performing database query?",
        "Describe your approach to designing a scalable system architecture.",
        "Walk me through your debugging process for production issues.",
        "What security measures would you implement for a web application?",
        "Explain the concept of microservices and their advantages.",
        "How do you handle version control in a team environment?",
        "Describe the differences between SQL and NoSQL databases.",
        "What is containerization and how does Docker work?",
        "Explain the principles of test-driven development (TDD).",
        "How would you implement caching to improve application performance?",
        "Describe your experience with cloud platforms (AWS, Azure, GCP).",
        "What are design patterns and can you give examples?",
        "How do you ensure code quality in your projects?",
        "Explain the concept of CI/CD and its benefits.",
        "How would you handle database migrations in production?",
        "Describe your approach to API design and documentation.",
        "What monitoring and logging strategies do you use?",
        "How do you handle error handling and exception management?",
        "Explain the principles of responsive web design.",
        "How would you implement authentication and authorization in a web app?",
        "Describe the differences between synchronous and asynchronous processing.",
        "What is load balancing and how would you implement it?",
        "Explain the concept of database indexing and when to use it.",
        "How would you handle file uploads and storage in a web application?",
        "Describe your approach to API rate limiting and throttling.",
        "What are the key principles of object-oriented programming?",
        "How would you implement real-time features in a web application?",
        "Explain the concept of dependency injection and its benefits.",
        "Describe different types of software testing and their purposes.",
        "How would you handle data validation on both client and server side?",
        "What is the difference between horizontal and vertical scaling?",
        "Explain the concept of eventual consistency in distributed systems.",
        "How would you implement search functionality in a large dataset?",
        "Describe your approach to handling concurrent requests and race conditions.",
        "What are the trade-offs between different database types?",
        "How would you implement a message queue system?",
        "Explain the concept of serverless architecture and its use cases.",
        "Describe your approach to code refactoring and technical debt management.",
        "How would you implement data backup and disaster recovery?",
        "What are the key considerations for mobile app performance optimization?",
        "Explain the concept of blockchain technology and its applications.",
        "How would you implement cross-browser compatibility?",
        "Describe your approach to implementing third-party integrations.",
        "What are the security considerations for API development?",
        "How would you handle large-scale data processing and ETL pipelines?",
        "Explain the concept of progressive web apps (PWAs).",
        "Describe your approach to database schema design and normalization.",
        "How would you implement A/B testing in a web application?",
        "What are the key principles of functional programming?",
        "How would you optimize front-end performance and loading times?",
        "Explain the concept of event-driven architecture.",
        "Describe your approach to implementing internationalization (i18n).",
        "How would you handle session management in a distributed system?",
        "What are the considerations for implementing machine learning in production?",
        "How would you design a system for handling millions of concurrent users?",
        "Explain the concept of SOLID principles in software design.",
        "Describe your approach to implementing email delivery systems.",
        "How would you handle data privacy and GDPR compliance?",
        "What are the key considerations for implementing payment processing?",
        "How would you design a recommendation system?",
        "Explain the concept of graph databases and their use cases.",
        "Describe your approach to implementing content delivery networks (CDNs).",
        "How would you handle legacy system integration?",
        "What are the key principles of DevOps and infrastructure as code?",
        "How would you implement effective monitoring and alerting systems?",
        "Explain the concept of chaos engineering and its benefits.",
        "Describe your approach to implementing multi-tenant architecture.",
        "How would you handle data migration between different systems?",
        "What are the considerations for implementing real-time analytics?",
        "How would you design a scalable notification system?",
        "Explain the concept of domain-driven design (DDD).",
        "Describe your approach to implementing automated testing pipelines.",
        "How would you handle configuration management across environments?",
        "What are the key considerations for implementing GraphQL subscriptions?"
      ]
    },
    {
      id: "leadership",
      title: "Leadership & Management",
      description: "Management scenarios and leadership challenges",
      questions: 35,
      difficulty: "Medium",
      color: "bg-green-500",
      sampleQuestions: [
        "How do you handle underperforming team members?",
        "Describe your approach to managing competing priorities.",
        "Tell me about a time you had to deliver difficult feedback.",
        "How do you motivate team members during challenging projects?",
        "Describe your experience with change management initiatives.",
        "How do you build trust within your team?",
        "Describe your leadership style and when you adapt it.",
        "How do you handle conflicts between team members?",
        "What strategies do you use for effective delegation?",
        "How do you ensure team members feel valued and heard?",
        "Describe your approach to setting team goals and KPIs.",
        "How do you handle budget constraints while maintaining team morale?",
        "What's your strategy for onboarding new team members?",
        "How do you handle remote or distributed team management?",
        "Describe your approach to performance reviews and career development.",
        "How do you foster innovation and creativity within your team?",
        "Describe your approach to cross-functional team leadership.",
        "How do you handle team members who resist change?",
        "What's your strategy for managing team burnout and workload?",
        "How do you approach succession planning and knowledge transfer?",
        "Describe your experience with agile team management.",
        "How do you handle situations where you need to let someone go?",
        "What's your approach to building a diverse and inclusive team?",
        "How do you manage stakeholder expectations while protecting your team?",
        "Describe your strategy for scaling team operations.",
        "How do you handle situations where team members disagree with your decisions?",
        "What's your approach to managing team dynamics during organizational changes?",
        "How do you ensure effective communication across different time zones?",
        "Describe your experience with matrix management structures.",
        "How do you handle competing demands from different stakeholders?",
        "What's your strategy for developing leadership skills in team members?",
        "How do you approach budget planning and resource allocation?",
        "Describe your experience with crisis leadership and decision-making.",
        "How do you maintain team culture during rapid growth?",
        "What's your approach to managing vendor relationships and external teams?"
      ]
    },
    {
      id: "situational",
      title: "Situational Judgment",
      description: "Critical thinking and problem-solving scenarios",
      questions: 40,
      difficulty: "Medium", 
      color: "bg-orange-500",
      sampleQuestions: [
        "A key client is threatening to leave due to service issues. What's your approach?",
        "You discover a critical bug in production right before a major release. What do you do?",
        "Your team is missing deadlines consistently. How do you address this?",
        "A colleague takes credit for your work in a meeting. How do you handle it?",
        "You're asked to implement a feature you believe is ethically questionable. What's your response?",
        "Your manager asks you to work on a project outside your expertise. How do you proceed?",
        "A stakeholder keeps changing requirements mid-project. How do you handle this?",
        "You notice a security vulnerability in your company's system. What do you do?",
        "Your team is split on two different technical approaches. How do you resolve this?",
        "A vendor delivers subpar work that affects your project timeline. How do you respond?",
        "You're assigned to lead a project with team members more experienced than you. How do you approach this?",
        "A customer requests a feature that would compromise system performance. How do you handle this?",
        "You discover that a previous decision you made was incorrect and caused issues. What do you do?",
        "Your company is considering layoffs and team morale is low. How do you manage this situation?",
        "You're asked to estimate a project but lack sufficient information. How do you proceed?",
        "A team member consistently arrives late to meetings and misses deadlines. How do you address this?",
        "You receive conflicting feedback from two different managers. How do you handle this situation?",
        "A project you're leading is significantly over budget. What's your next step?",
        "You discover that a competitor has released a similar product before your launch. How do you respond?",
        "A key team member wants to leave in the middle of a critical project. How do you handle this?",
        "You're asked to work overtime regularly, affecting your work-life balance. How do you respond?",
        "A client is asking for additional features without additional budget. How do you handle this?",
        "You realize that a decision made by senior leadership will negatively impact your project. What do you do?",
        "A team member reports harassment by another colleague. How do you handle this situation?",
        "You're asked to compromise on quality to meet a deadline. What's your approach?",
        "A customer is angry about a service failure and is demanding immediate compensation. How do you respond?",
        "You discover that your team's work duplicates another team's efforts. How do you address this?",
        "A supplier fails to deliver critical components on time. What's your response?",
        "You're offered a promotion that would require relocating. How do you make this decision?",
        "A project requirement changes drastically after 70% completion. How do you handle this?",
        "You suspect a colleague is not being honest about their work progress. How do you address this?",
        "A new regulation requires significant changes to your product. How do you approach this?",
        "You're asked to give a presentation to executives with only 24 hours notice. How do you prepare?",
        "A team member's personal issues are affecting their work performance. How do you handle this?",
        "You discover that your manager has been taking credit for your team's work. What do you do?",
        "A client wants to cancel a contract midway through the project. How do you respond?",
        "You're assigned to work with a team that has a history of conflict. How do you approach this?",
        "A critical system failure occurs during peak business hours. What's your immediate response?",
        "You realize that a promised deadline is impossible to meet. How do you communicate this?",
        "A new competitor offers your key employees higher salaries. How do you respond?"
      ]
    }
  ];

  const mockInterviewTypes = [
    {
      type: "Phone/Video Screen",
      duration: "30-45 min",
      description: "Initial screening with HR and hiring manager focusing on culture fit and basic qualifications",
      icon: <MessageSquare className="h-6 w-6" />,
      topics: ["Background Review", "Culture Fit", "Salary Expectations", "Availability"]
    },
    {
      type: "Technical Deep Dive",
      duration: "60-90 min", 
      description: "Comprehensive technical assessment with coding challenges and system design",
      icon: <Brain className="h-6 w-6" />,
      topics: ["Live Coding", "System Design", "Technical Problem Solving", "Code Review"]
    },
    {
      type: "Behavioral & Leadership",
      duration: "45-60 min",
      description: "Behavioral questions using STAR method and leadership scenarios",
      icon: <Users className="h-6 w-6" />,
      topics: ["STAR Method", "Leadership Experience", "Conflict Resolution", "Team Collaboration"]
    },
    {
      type: "Executive Final Round",
      duration: "60-120 min",
      description: "Senior leadership interview focusing on strategic thinking and cultural alignment",
      icon: <Target className="h-6 w-6" />,
      topics: ["Strategic Vision", "Executive Presence", "Business Acumen", "Long-term Goals"]
    },
    {
      type: "Case Study Interview",
      duration: "90 min",
      description: "Business case analysis and presentation for consulting and strategy roles",
      icon: <Lightbulb className="h-6 w-6" />,
      topics: ["Problem Analysis", "Framework Thinking", "Data Interpretation", "Recommendation"]
    }
  ];

  const performanceAreas = [
    { 
      area: "Communication Skills", 
      score: 87, 
      improvement: "+12%", 
      feedback: "Clear articulation and active listening. Work on reducing filler words.",
      trend: "improving"
    },
    { 
      area: "Technical Expertise", 
      score: 92, 
      improvement: "+8%", 
      feedback: "Strong technical knowledge. Consider practicing system design problems.",
      trend: "stable"
    },
    { 
      area: "Problem-Solving Approach", 
      score: 84, 
      improvement: "+18%", 
      feedback: "Structured thinking process. Focus on edge case consideration.",
      trend: "improving"
    },
    { 
      area: "Cultural Alignment", 
      score: 89, 
      improvement: "+5%", 
      feedback: "Good value alignment. Share more specific examples of cultural fit.",
      trend: "stable"
    },
    {
      area: "Leadership Potential",
      score: 78,
      improvement: "+22%",
      feedback: "Growing leadership awareness. Practice conflict resolution scenarios.",
      trend: "improving"
    }
  ];

  // Question selection functions
  const selectRandomQuestion = (categoryId: string) => {
    const category = practiceCategories.find(cat => cat.id === categoryId);
    if (!category) return "";
    
    // Get available questions (excluding recently used ones)
    const availableQuestions = category.sampleQuestions.filter(
      question => !questionHistory.includes(question)
    );
    
    // If all questions have been used, reset history
    const questionsToUse = availableQuestions.length > 0 ? availableQuestions : category.sampleQuestions;
    
    // Select random question
    const randomIndex = Math.floor(Math.random() * questionsToUse.length);
    return questionsToUse[randomIndex];
  };

  const handleCategorySelection = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const newQuestion = selectRandomQuestion(categoryId);
    setCurrentQuestion(newQuestion);
    setCurrentQuestionIndex(0);
    setQuestionHistory([newQuestion]);
    setPracticeScore(0); // Reset score when changing category
    toast.success(`Started practicing ${practiceCategories.find(cat => cat.id === categoryId)?.title}`);
  };

  const getNextQuestion = () => {
    if (!selectedCategory) return;
    
    const newQuestion = selectRandomQuestion(selectedCategory);
    setCurrentQuestion(newQuestion);
    setCurrentQuestionIndex(prev => prev + 1);
    setQuestionHistory(prev => [...prev.slice(-3), newQuestion]); // Keep last 4 questions in history
    setPracticeScore(0); // Reset score for new question
    toast.info("New question generated!");
  };

  const getCategoryTip = (categoryId: string) => {
    const tips = {
      behavioral: "Use the STAR method (Situation, Task, Action, Result) for structured responses",
      technical: "Break down the problem, explain your approach, and discuss trade-offs",
      leadership: "Focus on specific examples of influence, team building, and decision-making",
      situational: "Think through the scenario step-by-step and explain your reasoning"
    };
    return tips[categoryId as keyof typeof tips] || "Take your time and provide specific examples";
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript + ' ');
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast.error('Speech recognition error occurred');
      };
    }
  }, []);

  // Timer for recording
  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording, isPaused]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup audio level monitoring
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateAudioLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(average);
        if (isRecording) {
          requestAnimationFrame(updateAudioLevel);
        }
      };
      updateAudioLevel();

      // Setup MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        audioContext.close();
      };

      mediaRecorderRef.current.start();
      
      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }

      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      setTranscript("");
      setAssessmentResults(null);
      toast.success("Recording started - answer the question naturally");
    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error('Failed to start recording. Please check your microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setIsRecording(false);
    setIsPaused(false);
    setAudioLevel(0);
    
    // Start analysis
    setIsAnalyzing(true);
    toast.info("Analyzing your response...");
    
    // Simulate analysis delay and then analyze
    setTimeout(() => {
      const results = analyzeResponse(transcript, selectedCategory);
      setAssessmentResults(results);
      setPracticeScore(results.overallScore);
      setIsAnalyzing(false);
      toast.success(`Analysis complete! Score: ${results.overallScore}/100`);
    }, 2000);
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        if (recognitionRef.current) {
          recognitionRef.current.start();
        }
      } else {
        mediaRecorderRef.current.pause();
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      }
    }
    
    setIsPaused(!isPaused);
    toast.info(isPaused ? "Recording resumed" : "Recording paused");
  };

  const analyzeResponse = (transcript: string, category: string | null): AssessmentResult => {
    if (!transcript.trim() || !category) {
      return {
        overallScore: 0,
        breakdown: { communication: 0, content: 0, structure: 0, impact: 0 },
        strengths: ["Recording detected"],
        improvements: ["Please provide a verbal response to analyze"],
        transcript: transcript || "No transcript available"
      };
    }

    const words = transcript.trim().split(/\s+/);
    const wordCount = words.length;
    const sentences = transcript.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Category-specific analysis
    const categoryAnalysis = getCategorySpecificAnalysis(transcript, category, wordCount);
    
    // Communication score (based on length, clarity, flow)
    let communicationScore = Math.min(100, Math.max(20, (wordCount / 150) * 100));
    if (transcript.includes("um") || transcript.includes("uh")) {
      communicationScore -= 10;
    }
    
    // Content score (based on category-specific criteria)
    const contentScore = categoryAnalysis.contentScore;
    
    // Structure score (introduction, body, conclusion)
    let structureScore = 60; // Base score
    if (sentences.length >= 3) structureScore += 20;
    if (categoryAnalysis.hasStructure) structureScore += 20;
    
    // Impact score (based on specific examples, quantifiable results)
    let impactScore = categoryAnalysis.impactScore;
    
    const breakdown = {
      communication: Math.round(communicationScore),
      content: Math.round(contentScore),
      structure: Math.round(structureScore),
      impact: Math.round(impactScore)
    };
    
    const overallScore = Math.round(
      (breakdown.communication + breakdown.content + breakdown.structure + breakdown.impact) / 4
    );

    return {
      overallScore,
      breakdown,
      strengths: categoryAnalysis.strengths,
      improvements: categoryAnalysis.improvements,
      transcript: transcript.trim()
    };
  };

  const getCategorySpecificAnalysis = (transcript: string, category: string, wordCount: number) => {
    const lowerTranscript = transcript.toLowerCase();
    
    switch (category) {
      case 'behavioral':
        const hasSTAR = {
          situation: lowerTranscript.includes('situation') || lowerTranscript.includes('when') || lowerTranscript.includes('at'),
          task: lowerTranscript.includes('task') || lowerTranscript.includes('needed') || lowerTranscript.includes('responsible'),
          action: lowerTranscript.includes('action') || lowerTranscript.includes('did') || lowerTranscript.includes('decided'),
          result: lowerTranscript.includes('result') || lowerTranscript.includes('outcome') || lowerTranscript.includes('achieved')
        };
        const starCount = Object.values(hasSTAR).filter(Boolean).length;
        
        return {
          contentScore: Math.min(100, starCount * 25 + (wordCount > 100 ? 20 : 0)),
          hasStructure: starCount >= 3,
          impactScore: lowerTranscript.includes('result') || lowerTranscript.includes('achieved') ? 80 : 50,
          strengths: [
            starCount >= 3 ? "Good STAR method structure" : "",
            wordCount > 100 ? "Comprehensive response" : "",
            lowerTranscript.includes('learn') ? "Shows growth mindset" : ""
          ].filter(Boolean),
          improvements: [
            starCount < 3 ? "Try using the complete STAR method (Situation, Task, Action, Result)" : "",
            wordCount < 80 ? "Provide more detailed examples" : "",
            !lowerTranscript.includes('result') ? "Include specific outcomes and results" : ""
          ].filter(Boolean)
        };

      case 'technical':
        const technicalKeywords = ['architecture', 'design', 'implement', 'optimize', 'scale', 'security', 'performance', 'database', 'api'];
        const keywordCount = technicalKeywords.filter(keyword => lowerTranscript.includes(keyword)).length;
        
        return {
          contentScore: Math.min(100, keywordCount * 12 + (wordCount > 120 ? 30 : 0)),
          hasStructure: lowerTranscript.includes('first') || lowerTranscript.includes('approach') || lowerTranscript.includes('consider'),
          impactScore: lowerTranscript.includes('trade-off') || lowerTranscript.includes('pros and cons') ? 85 : 60,
          strengths: [
            keywordCount >= 3 ? "Strong technical vocabulary" : "",
            lowerTranscript.includes('trade-off') ? "Considers trade-offs" : "",
            lowerTranscript.includes('scale') ? "Thinks about scalability" : ""
          ].filter(Boolean),
          improvements: [
            keywordCount < 2 ? "Use more specific technical terminology" : "",
            !lowerTranscript.includes('trade-off') ? "Discuss trade-offs and alternatives" : "",
            wordCount < 100 ? "Provide more technical depth" : ""
          ].filter(Boolean)
        };

      case 'leadership':
        const leadershipKeywords = ['team', 'lead', 'motivate', 'decision', 'feedback', 'influence', 'delegate', 'vision'];
        const leaderKeywordCount = leadershipKeywords.filter(keyword => lowerTranscript.includes(keyword)).length;
        
        return {
          contentScore: Math.min(100, leaderKeywordCount * 15 + (wordCount > 100 ? 25 : 0)),
          hasStructure: lowerTranscript.includes('challenge') && lowerTranscript.includes('approach'),
          impactScore: lowerTranscript.includes('team') && lowerTranscript.includes('result') ? 80 : 55,
          strengths: [
            leaderKeywordCount >= 3 ? "Demonstrates leadership awareness" : "",
            lowerTranscript.includes('feedback') ? "Values communication" : "",
            lowerTranscript.includes('team') ? "Team-focused approach" : ""
          ].filter(Boolean),
          improvements: [
            leaderKeywordCount < 2 ? "Include more leadership-specific examples" : "",
            !lowerTranscript.includes('team') ? "Emphasize team impact and collaboration" : "",
            !lowerTranscript.includes('decision') ? "Describe your decision-making process" : ""
          ].filter(Boolean)
        };

      case 'situational':
        const problemSolvingKeywords = ['analyze', 'consider', 'option', 'priority', 'stakeholder', 'impact', 'solution'];
        const problemKeywordCount = problemSolvingKeywords.filter(keyword => lowerTranscript.includes(keyword)).length;
        
        return {
          contentScore: Math.min(100, problemKeywordCount * 14 + (wordCount > 100 ? 30 : 0)),
          hasStructure: lowerTranscript.includes('first') && (lowerTranscript.includes('then') || lowerTranscript.includes('next')),
          impactScore: lowerTranscript.includes('stakeholder') || lowerTranscript.includes('priority') ? 85 : 60,
          strengths: [
            problemKeywordCount >= 3 ? "Structured problem-solving approach" : "",
            lowerTranscript.includes('stakeholder') ? "Considers stakeholder impact" : "",
            lowerTranscript.includes('priority') ? "Understands prioritization" : ""
          ].filter(Boolean),
          improvements: [
            problemKeywordCount < 2 ? "Explain your reasoning and thought process more clearly" : "",
            !lowerTranscript.includes('stakeholder') ? "Consider stakeholder impact in your analysis" : "",
            !lowerTranscript.includes('option') ? "Discuss alternative solutions or options" : ""
          ].filter(Boolean)
        };

      default:
        return {
          contentScore: Math.min(100, wordCount * 0.8),
          hasStructure: false,
          impactScore: 60,
          strengths: ["Response recorded successfully"],
          improvements: ["Provide more specific examples"]
        };
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Question Bank handlers
  const handlePracticeClick = (categoryId: string) => {
    setActiveTab("practice");
    handleCategorySelection(categoryId);
    toast.success("Switched to practice session");
  };

  const handleBrowseAllClick = (categoryId: string) => {
    setSelectedBrowseCategory(categoryId);
    setShowQuestionModal(true);
    setSearchTerm("");
  };

  const copyQuestionToClipboard = (question: string) => {
    navigator.clipboard.writeText(question);
    toast.success("Question copied to clipboard");
  };

  const getFilteredQuestions = () => {
    if (!selectedBrowseCategory) return [];
    const category = practiceCategories.find(cat => cat.id === selectedBrowseCategory);
    if (!category) return [];
    
    if (!searchTerm) return category.sampleQuestions;
    
    return category.sampleQuestions.filter(question =>
      question.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleStartRecording = startRecording;
  const handleStopRecording = stopRecording;
  const handlePauseRecording = pauseRecording;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">AI Interview Preparation</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Practice with AI-powered mock interviews, get instant feedback, and build confidence for your next opportunity
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{completedSessions}</div>
                <div className="text-sm text-muted-foreground">Sessions Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">87%</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24</div>
                <div className="text-sm text-muted-foreground">Hours Practiced</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">+15%</div>
                <div className="text-sm text-muted-foreground">Improvement</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 glass-card">
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Practice
            </TabsTrigger>
            <TabsTrigger value="mock" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Mock Interview
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Feedback
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Question Bank
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="practice">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Practice Categories */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Choose Practice Category</h3>
                <div className="space-y-4">
                  {practiceCategories.map((category) => (
                    <Card 
                      key={category.id} 
                      className={`glass-card hover:shadow-lg transition-all cursor-pointer ${
                        selectedCategory === category.id ? 'ring-2 ring-primary bg-primary/5' : ''
                      }`}
                      onClick={() => handleCategorySelection(category.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                            <div>
                              <h4 className="font-medium">{category.title}</h4>
                              <p className="text-sm text-muted-foreground">{category.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">{category.questions} Questions</Badge>
                            <div className="text-xs text-muted-foreground mt-1">{category.difficulty}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Current Practice Session */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Practice Session</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedCategory && currentQuestion ? (
                    <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Current Question:</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {practiceCategories.find(cat => cat.id === selectedCategory)?.title}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Question {currentQuestionIndex + 1}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-foreground leading-relaxed">
                        "{currentQuestion}"
                      </p>
                      <div className="mt-3 text-xs text-muted-foreground">
                        💡 <strong>Tip:</strong> {getCategoryTip(selectedCategory)}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted/30 p-8 rounded-lg border-2 border-dashed border-muted text-center">
                      <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h4 className="font-medium text-muted-foreground mb-2">Select a Category to Start</h4>
                      <p className="text-sm text-muted-foreground">
                        Choose a practice category from the left to begin your interview preparation session.
                      </p>
                    </div>
                  )}

                  {selectedCategory && currentQuestion && (
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <Button 
                        onClick={getNextQuestion} 
                        variant="outline" 
                        size="lg"
                        className="flex items-center gap-2"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Next Question
                      </Button>
                    </div>
                  )}

                  {selectedCategory && currentQuestion && (
                    <div className="flex items-center justify-center gap-4">
                    {!isRecording ? (
                      <Button onClick={handleStartRecording} size="lg" className="flex items-center gap-2">
                        <Mic className="h-4 w-4" />
                        Start Recording
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button 
                          onClick={handlePauseRecording} 
                          variant="outline" 
                          size="lg"
                          className="flex items-center gap-2"
                        >
                          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                          {isPaused ? "Resume" : "Pause"}
                        </Button>
                        <Button 
                          onClick={handleStopRecording} 
                          variant="destructive" 
                          size="lg"
                          className="flex items-center gap-2"
                        >
                          <MicOff className="h-4 w-4" />
                          Stop & Analyze
                        </Button>
                      </div>
                     )}
                    </div>
                  )}

                 </CardContent>
              </Card>
            </div>

            {/* Assessment Results Section */}
            {assessmentResults && !isRecording && !isAnalyzing && (
              <Card className="mt-6 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Assessment Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Overall Score */}
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-primary">
                      {assessmentResults.overallScore}/100
                    </div>
                    <Progress 
                      value={assessmentResults.overallScore} 
                      className="h-3 w-full max-w-md mx-auto"
                    />
                    <p className="text-sm text-muted-foreground">Overall Performance</p>
                  </div>

                  {/* Score Breakdown */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Communication</span>
                          <span className="text-sm font-bold">{assessmentResults.breakdown.communication}</span>
                        </div>
                        <Progress value={assessmentResults.breakdown.communication} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Content</span>
                          <span className="text-sm font-bold">{assessmentResults.breakdown.content}</span>
                        </div>
                        <Progress value={assessmentResults.breakdown.content} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Structure</span>
                          <span className="text-sm font-bold">{assessmentResults.breakdown.structure}</span>
                        </div>
                        <Progress value={assessmentResults.breakdown.structure} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Impact</span>
                          <span className="text-sm font-bold">{assessmentResults.breakdown.impact}</span>
                        </div>
                        <Progress value={assessmentResults.breakdown.impact} className="h-2" />
                      </div>
                    </div>
                  </div>

                  {/* Strengths and Improvements */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-600 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {assessmentResults.strengths.filter(s => s.trim()).map((strength, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-amber-600 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-2">
                        {assessmentResults.improvements.filter(i => i.trim()).map((improvement, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Transcript Section */}
                  {assessmentResults.transcript && (
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Your Response
                      </h4>
                      <div className="bg-muted/50 rounded-lg p-4 max-h-32 overflow-y-auto">
                        <p className="text-sm leading-relaxed">
                          {assessmentResults.transcript}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    <Button 
                      onClick={() => {
                        setAssessmentResults(null);
                        setTranscript("");
                      }}
                      variant="outline" 
                      className="flex items-center gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Try Again
                    </Button>
                    <Button 
                      onClick={getNextQuestion}
                      className="flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Next Question
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="mock">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Full Mock Interview Sessions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockInterviewTypes.map((mock, index) => (
                  <Card key={index} className="glass-card hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {mock.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{mock.type}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{mock.duration}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{mock.description}</p>
                      <div className="space-y-3 mb-4">
                        <div>
                          <div className="text-sm font-medium mb-2">Interview Topics:</div>
                          <div className="flex flex-wrap gap-1">
                            {mock.topics.map((topic, topicIndex) => (
                              <Badge key={topicIndex} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">Start Interview</Button>
                        <Button variant="outline" size="sm">Preview</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Performance Analysis</h3>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Strength Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {performanceAreas.map((area, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{area.area}</span>
                              <Badge 
                                variant="outline" 
                                className={area.trend === 'improving' ? 'text-green-600 border-green-200' : 'text-blue-600 border-blue-200'}
                              >
                                {area.improvement}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{area.feedback}</p>
                          </div>
                          <span className="font-bold text-lg ml-4">{area.score}/100</span>
                        </div>
                        <Progress value={area.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        <strong>Strengths Identified:</strong> Excellent use of the STAR method in behavioral responses. 
                        Your technical explanations are clear and well-structured. Strong examples of leadership impact.
                      </AlertDescription>
                    </Alert>
                    <Alert className="border-blue-200 bg-blue-50">
                      <Lightbulb className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        <strong>Growth Opportunities:</strong> Include more quantified business impact in your examples. 
                        Practice articulating failures and lessons learned. Work on asking strategic questions at interview end.
                      </AlertDescription>
                    </Alert>
                    <Alert className="border-orange-200 bg-orange-50">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-800">
                        <strong>AI Insight:</strong> Your confidence has improved 23% over the last month. 
                        Focus on technical system design questions for continued growth.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="library">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Interview Question Library</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {practiceCategories.map((category) => (
                  <Card key={category.id} className="glass-card">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{category.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{category.questions} questions</span>
                        <Badge variant="outline">{category.difficulty}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Sample Questions:</div>
                        <div className="space-y-1">
                          {category.sampleQuestions.slice(0, 2).map((question, qIndex) => (
                            <div key={qIndex} className="text-xs text-muted-foreground p-2 bg-muted/30 rounded">
                              "{question}"
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleBrowseAllClick(category.id)}
                        >
                          Browse All
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handlePracticeClick(category.id)}
                        >
                          Practice
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Performance Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-500">+15%</div>
                        <div className="text-sm text-muted-foreground">Improvement this month</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Confidence Level</span>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Personalized Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Badge variant="secondary" className="mt-0.5">Priority</Badge>
                          <p className="text-sm text-blue-800">
                            <strong>Enhance STAR Responses:</strong> Include specific metrics and quantified outcomes. 
                            Practice with "So what?" follow-ups to demonstrate business impact.
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Badge variant="secondary" className="mt-0.5">Technical</Badge>
                          <p className="text-sm text-purple-800">
                            <strong>System Design Practice:</strong> Focus on scalability discussions and trade-off analysis. 
                            Practice drawing diagrams while explaining your thought process.
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Badge variant="secondary" className="mt-0.5">Strength</Badge>
                          <p className="text-sm text-green-800">
                            <strong>Communication Excellence:</strong> Your clear articulation and active listening skills 
                            are standout strengths. Continue leveraging this in complex technical discussions.
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Badge variant="secondary" className="mt-0.5">Strategy</Badge>
                          <p className="text-sm text-orange-800">
                            <strong>Question Preparation:</strong> Develop 3-5 thoughtful questions about company culture, 
                            team dynamics, and growth opportunities to ask at interview end.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Question Browser Modal */}
      <Dialog open={showQuestionModal} onOpenChange={setShowQuestionModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {selectedBrowseCategory && practiceCategories.find(cat => cat.id === selectedBrowseCategory)?.title} Questions
              <Badge variant="outline" className="ml-2">
                {getFilteredQuestions().length} questions
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Questions list */}
            <div className="flex-1 overflow-y-auto space-y-3">
              {getFilteredQuestions().map((question, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{question}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyQuestionToClipboard(question)}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (selectedBrowseCategory) {
                            setCurrentQuestion(question);
                            setSelectedCategory(selectedBrowseCategory);
                            setActiveTab("practice");
                            setShowQuestionModal(false);
                            toast.success("Started practice with selected question");
                          }
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              
              {getFilteredQuestions().length === 0 && searchTerm && (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No questions found matching "{searchTerm}"</p>
                </div>
              )}
            </div>

            {/* Modal footer with actions */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                {selectedBrowseCategory && practiceCategories.find(cat => cat.id === selectedBrowseCategory)?.description}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (selectedBrowseCategory) {
                      handlePracticeClick(selectedBrowseCategory);
                      setShowQuestionModal(false);
                    }
                  }}
                >
                  Start Practice Session
                </Button>
                <Button variant="ghost" onClick={() => setShowQuestionModal(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIInterviewPrep;