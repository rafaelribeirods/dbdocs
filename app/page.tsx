'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import Loading from "@/components/loading";

declare global {
  interface Window {
    electron: {
      getProjects: () => Promise<string[]>;
      getAppDataPath: () => Promise<string>;
    };
  }
}

export default function Home() {
  const [projects, setProjects] = useState<string[] | null>(null);

  useEffect(() => {
    window.electron.getAppDataPath().then(path => {
      console.log("path", path);
    });

    window.electron.getProjects().then(projects => {
      setProjects(projects);
      console.log("projects", projects);
    });
  }, []);

  if (projects === null) return <Loading/>;
  
  return (
    <div className="flex items-center justify-center min-h-screen light:bg-gray-100">
      <Tabs defaultValue={projects.length > 0 ? "projects" : "new"}>
        <TabsList>
          <TabsTrigger value="projects" disabled={projects.length === 0}>Your projects</TabsTrigger>
          <TabsTrigger value="new">Create a new project</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Your projects</CardTitle>
              <CardDescription>
                Select one of the available projects to continue working on it.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {projects.map(project => (
                        <SelectItem key={project} value={project}>{project}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Open</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>Create a new project</CardTitle>
              <CardDescription>
                Start a new project by naming it.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="new-project-name">Name</Label>
                <Input id="new-project-name" type="text" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Create</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
