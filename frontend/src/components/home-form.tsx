import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Linkedin, Globe, AlertCircleIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { LoadProjects } from "../../wailsjs/go/main/App"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export function HomeForm() {

  useEffect(() => {
    void loadProjects();
  }, []);

  const [error, setError] = useState<string>("");
  const [projects, setProjects] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);

  const loadProjects = async () => {
    setLoading(true);
    LoadProjects()
      .then((loadedProjects: string[]) => {
        setProjects(loadedProjects);
        setError("");
      })
      .catch((error: Error) => {
        setError(`${error}`);
        setProjects([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      { error && (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p>{error}</p>
        </AlertDescription>
      </Alert>
      )}
      { !isLoading && (
      <>
      <Tabs defaultValue={projects.length > 0 ? "projects" : "new_project"}>
        <TabsList>
          {projects.length > 0 && ( 
          <TabsTrigger className="cursor-pointer" value="projects">Open a project</TabsTrigger>
          )}
          <TabsTrigger className="cursor-pointer" value="new_project">Create a new project</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Open a project</CardTitle>
              <CardDescription>
                Select one of your existing projects to continue.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project} value={project}>
                        {project}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="cursor-pointer">Open</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="new_project">
          <Card>
            <CardHeader>
              <CardTitle>Create a new project</CardTitle>
              <CardDescription>
                Create a new project to start documenting your databases.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Project's name</Label>
                <Input id="name" type="text" placeholder="My Project" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="cursor-pointer">Create</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="flex flex-wrap justify-center items-center gap-4 text-muted-foreground text-xs text-center">
        <a
        href="https://rrds.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center hover:text-primary transition-colors underline underline-offset-4"
        >
          <Globe className="w-4 h-4 mr-1" />
          rrds.dev
        </a>
        <a
          href="https://github.com/rafaelribeirods/dbscribe"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center hover:text-primary transition-colors underline underline-offset-4"
        >
          <Github className="w-4 h-4 mr-1" />
          GitHub
        </a>

        <a
          href="https://linkedin.com/in/rafaelribeirods"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center hover:text-primary transition-colors underline underline-offset-4"
        >
          <Linkedin className="w-4 h-4 mr-1" />
          LinkedIn
        </a>
      </div>
      </>
      )}
    </div>
    
  )
}