import imgErp from "@/assets/images/website/erp.png"
import imgIntender from "@/assets/images/website/intender.png"
import imgEasyfood from "@/assets/images/website/easyfood.png"
import { PhpLogo, PythonLogo, SqlLogo, VueLogo, WordpressLogo, SassLogo } from '@/components/logo/Logo'
import { ReactNode } from "react";



type Project = {
  img: string;
  number: string;
  name: string;
  desc: string;
  features: string[];
  link: string;
  stack: ReactNode[];
};

const projectMap: Map<String, Project> = new Map ([
  [
    "01",
    {
      img: imgErp,
      name: "Enterprise Resource Planning (ERP)",
      desc: "An internal-use platform for a contractor company.",
      features: [
        "Invoice tracking",
        "Item price tracking",
        "Subcontractor management"
      ],
      link: "https://erp.powerlight-tech.com",
      stack: [
        VueLogo(),
        PhpLogo(), 
        SqlLogo()
      ] 
    }
  ],
  [
    "02",
    {
      img: imgIntender,
      name: "Intender",
      desc: "A construction information provider",
      features: [
        "Provide project, company, contact info",
        "Admin dashboard",
        "Automatic data processing"
      ],
      link: "https://www.intender.my",
      stack: [
        VueLogo(),
        PhpLogo(),
        SqlLogo(),
        PythonLogo()
      ] 
    }
  ],
  [
    "03",
    {
      img: imgEasyfood,
      name: "Easyfood",
      desc: "Raw chicken E-commerce",
      features: [
        "Invoice tracking",
        "Item price tracking",
        "Subcontractor management"
      ],
      link: "https://www.easyfoodsd.com",
      stack: [
        WordpressLogo(),
        SassLogo()
      ] 
    }
  ]
]) 

    
    export default projectMap