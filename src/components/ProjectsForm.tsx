
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Code, Calendar, ExternalLink, Github, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { optionalProjectSchema, OptionalProjectFormData } from "@/schemas/optionalResumeSchemas";
import { cn } from "@/lib/utils";

interface ProjectsFormProps {
  data: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    startDate: string;
    endDate?: string;
    current: boolean;
    projectUrl?: string;
    githubUrl?: string;
  }>;
  onUpdate: (data: any[]) => void;
  onValidationChange: (isValid: boolean) => void;
  industry?: string;
}

const ProjectsForm = ({ data, onUpdate, onValidationChange, industry }: ProjectsFormProps) => {
  const [projects, setProjects] = useState(data || []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [techInput, setTechInput] = useState("");
  const [currentTechnologies, setCurrentTechnologies] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<OptionalProjectFormData>({
    resolver: zodResolver(optionalProjectSchema),
    mode: "onChange"
  });

  const watchCurrent = watch("current");

  // Always mark as valid since this is an optional section
  useEffect(() => {
    onValidationChange(true);
  }, [onValidationChange]);

  useEffect(() => {
    onUpdate(projects);
  }, [projects, onUpdate]);

  useEffect(() => {
    setValue("technologies", currentTechnologies);
  }, [currentTechnologies, setValue]);

  const addTechnology = () => {
    if (techInput.trim() && !currentTechnologies.includes(techInput.trim())) {
      setCurrentTechnologies([...currentTechnologies, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setCurrentTechnologies(currentTechnologies.filter(t => t !== tech));
  };

  const addProject = (formData: OptionalProjectFormData) => {
    // Only add if at least name and description are provided
    if (!formData.name?.trim() || !formData.description?.trim()) {
      return;
    }

    const newProject = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      technologies: currentTechnologies,
      startDate: formData.startDate || '',
      endDate: formData.endDate,
      current: formData.current || false,
      projectUrl: formData.projectUrl,
      githubUrl: formData.githubUrl
    };

    if (editingIndex !== null) {
      const updated = [...projects];
      updated[editingIndex] = newProject;
      setProjects(updated);
      setEditingIndex(null);
    } else {
      setProjects([...projects, newProject]);
    }
    
    reset();
    setCurrentTechnologies([]);
  };

  const editProject = (index: number) => {
    const project = projects[index];
    setEditingIndex(index);
    setCurrentTechnologies(project.technologies);
    reset({
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate || "",
      current: project.current,
      projectUrl: project.projectUrl || "",
      githubUrl: project.githubUrl || "",
      technologies: project.technologies
    });
  };

  const deleteProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      reset();
      setCurrentTechnologies([]);
    }
  };

  const getSuggestedTechnologies = () => {
    const suggestions = {
      tech: ["React", "Node.js", "Python", "JavaScript", "TypeScript", "AWS", "Docker", "PostgreSQL"],
      marketing: ["Google Analytics", "Facebook Ads", "Mailchimp", "Salesforce", "HubSpot", "SEO Tools"],
      creative: ["Adobe Photoshop", "Figma", "After Effects", "Illustrator", "Sketch", "InDesign"],
      finance: ["Excel", "Python", "R", "Bloomberg Terminal", "SQL", "Tableau"],
      healthcare: ["Epic", "Cerner", "FHIR", "HL7", "Telehealth Platforms"]
    };
    
    return suggestions[industry as keyof typeof suggestions] || [];
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Code className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="text-muted-foreground">
          Showcase your personal and professional projects. This section is optional.
        </p>
      </div>

      {/* Add/Edit Project Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            {editingIndex !== null ? "Edit Project" : "Add Project"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(addProject)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="e.g., E-commerce Platform"
                {...register("name")}
                className={cn(errors.name && "border-destructive")}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what you built, the problem it solved, and your role..."
                rows={4}
                {...register("description")}
                className={cn(errors.description && "border-destructive")}
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <Label>Technologies Used</Label>
              <div className="flex gap-2">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Add technology"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                />
                <Button type="button" onClick={addTechnology} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Suggested Technologies */}
              {industry && getSuggestedTechnologies().length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Suggested for {industry}:</p>
                  <div className="flex flex-wrap gap-2">
                    {getSuggestedTechnologies()
                      .filter(tech => !currentTechnologies.includes(tech))
                      .map((tech) => (
                      <Button
                        key={tech}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentTechnologies([...currentTechnologies, tech])}
                        className="text-xs"
                      >
                        {tech}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Technologies */}
              {currentTechnologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentTechnologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeTechnology(tech)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
              {errors.technologies && <p className="text-sm text-destructive">{errors.technologies.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="month"
                  {...register("startDate")}
                  className={cn(errors.startDate && "border-destructive")}
                />
                {errors.startDate && <p className="text-sm text-destructive">{errors.startDate.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  disabled={watchCurrent}
                  {...register("endDate")}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="current"
                {...register("current")}
                onCheckedChange={(checked) => setValue("current", checked as boolean)}
              />
              <Label htmlFor="current">Currently working on this project</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectUrl">Project URL</Label>
                <Input
                  id="projectUrl"
                  type="url"
                  placeholder="https://yourproject.com"
                  {...register("projectUrl")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  type="url"
                  placeholder="https://github.com/username/project"
                  {...register("githubUrl")}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {editingIndex !== null ? "Update Project" : "Add Project"}
              </Button>
              {editingIndex !== null && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingIndex(null);
                    reset();
                    setCurrentTechnologies([]);
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Projects List */}
      {projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Projects ({projects.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((project, index) => (
              <div key={project.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Code className="w-4 h-4 text-primary" />
                    {project.name}
                  </h4>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editProject(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteProject(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {project.startDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {project.startDate} - {project.current ? 'Present' : project.endDate}
                    </span>
                  )}
                  {project.projectUrl && (
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                      <ExternalLink className="w-3 h-3" />
                      Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                      <Github className="w-3 h-3" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {projects.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No projects added yet. This section is optional - you can skip it or add projects above.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
