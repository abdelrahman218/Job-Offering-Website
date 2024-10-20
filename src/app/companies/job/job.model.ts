export type Job = {
    id: string;
    title: string;
    careerLevel: "Internship" | "Junior" | "Experienced" | "Manager" | "Senior Management";
    jobCategory: "Full time" | "Part time" | "Freelance/Project";
    workplace: "On-site" | "Remote" | "Hybrid";
    description: string;
    companyId: string;
  };
  